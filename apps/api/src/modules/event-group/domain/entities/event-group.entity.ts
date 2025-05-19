import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CurrencyType } from '@repo/types/currency.type';
import { Id } from 'src/modules/shared/value-objects/id';
import { isSameArray } from 'src/util/is-same-array';
import { Balance } from '../model/balance.model';
import { SettlementCalculatorService } from '../services/settlement-calculator.service';
import { Currency } from '../value-objects/currency';
import { Expense } from './expense.entity';
import { Settlement } from './settlement.entity';

export class EventGroup {
  private constructor(
    private readonly _id: Id,
    private _title: string,
    private readonly _memberIds: string[],
    private _currency: Currency,
    private readonly _createdAt: Date,
    private _expenses: Expense[] = [],
    private readonly _settlements: Settlement[] = [],
  ) {}

  get id(): string {
    return this._id.value;
  }

  get title(): string {
    return this._title;
  }

  get memberIds(): string[] {
    return [...this._memberIds];
  }

  get currency(): CurrencyType {
    return this._currency.value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get memberCount(): number {
    return this._memberIds.length;
  }

  get expenses(): Expense[] {
    return [...this._expenses];
  }

  get settlements(): Settlement[] {
    return [...this._settlements];
  }

  set title(title: string) {
    this._title = title;
  }

  static create(title: string, userId: string, currency: string = 'JPY') {
    return new EventGroup(
      Id.create(),
      title,
      [userId],
      Currency.create(currency),
      new Date(),
    );
  }

  static reconstruct(
    id: string,
    title: string,
    userIds: string[],
    currency: string,
    createdAt: Date,
    expenses: {
      id: string;
      title: string;
      amount: number;
      createdAt: Date;
      payerId: string;
      payeeIds: string[];
    }[],
    settlements: {
      id: string;
      payeeId: string;
      payerId: string;
      amount: number;
    }[],
  ) {
    return new EventGroup(
      Id.reconstruct(id),
      title,
      userIds,
      Currency.create(currency),
      createdAt,
      expenses.map((expense) =>
        Expense.reconstruct(
          expense.id,
          expense.title,
          expense.amount,
          expense.createdAt,
          expense.payerId,
          expense.payeeIds,
        ),
      ),
      settlements.map((settlement) =>
        Settlement.reconstruct(
          settlement.id,
          settlement.payeeId,
          settlement.payerId,
          settlement.amount,
        ),
      ),
    );
  }

  changeCurrency(currency: string): void {
    this._currency = Currency.create(currency);
  }

  addMemberId(userId: string): void {
    if (this._memberIds.includes(userId))
      throw new ConflictException('User is already member of this group!');

    this._memberIds.push(userId);
  }

  removeMemberId(memberId: string): void {
    const expenseRelatedMembers = this._expenses.reduce<Set<string>>(
      (members, expense) => {
        members.add(expense.payerId);
        expense.payeeIds.forEach((payeeId) => members.add(payeeId));
        return members;
      },
      new Set(),
    );

    if (expenseRelatedMembers.has(memberId))
      throw new BadRequestException(
        "Member can't delete because due to relevance of some expense records!",
      );

    const deleteIndex = this._memberIds.findIndex((id) => id === memberId);
    if (deleteIndex === -1)
      throw new NotFoundException('Member no longer exist!');

    this._memberIds.splice(deleteIndex, 1);
  }

  addExpense(
    title: string,
    amount: number,
    payerId: string,
    payeeIds: string[],
  ): void {
    if (!this.isMember([payerId]))
      throw new BadRequestException('Payer is not member of Group!');
    if (!this.isMember(payeeIds))
      throw new BadRequestException('Some payee are not member of Group!');

    const newExpense = Expense.create(title, amount, payerId, payeeIds);
    this._expenses.push(newExpense);

    // 新しい精算記録作成
    this.createSettlements();
  }

  updateExpense(
    id: string,
    title: string,
    amount: number,
    payerId: string,
    payeeIds: string[],
  ): void {
    const expense = this._expenses.find((expense) => expense.id === id);
    if (!expense) throw new NotFoundException('Expense not found!');

    // 費用の更新
    expense.update(title, amount, payerId, payeeIds);

    // 費用に更新があった場合
    if (
      expense.amount !== amount ||
      expense.payerId !== payerId ||
      isSameArray(expense.payeeIds, payeeIds)
    ) {
      // 新しい精算記録作成
      this.createSettlements();
    }
  }

  deleteExpense(expenseId: string) {
    const deletableExpense = this._expenses.find(
      (expense) => expense.id === expenseId,
    );
    if (!deletableExpense)
      new NotFoundException('立て替え記録が見つかりません。');

    this._expenses = this._expenses.filter(
      (expense) => expense.id !== expenseId,
    );

    // 新しい精算記録を作成
    this.createSettlements();
  }

  private isMember(userIds: string[]) {
    return userIds.some((userId) => this._memberIds.includes(userId));
  }

  private deletePrevSettlements(): void {
    this._settlements.length = 0;
  }

  private createSettlements(): void {
    // 以前の精算記録を全削除
    this.deletePrevSettlements();

    // メンバーの収支管理を初期化
    const balances = this._memberIds.map((memberId) => new Balance(memberId));

    // 費用ごとの収支をメンバーに足していく
    this._expenses.forEach((expense) => {
      expense.calcBalances(balances);
    });

    // 精算額を算出
    const settlements = SettlementCalculatorService.calculate(balances);

    settlements.forEach((settlement) => {
      const settlementEntity = Settlement.create(
        settlement.payeeId,
        settlement.payerId,
        settlement.amount,
      );

      this._settlements.push(settlementEntity);
    });
  }
}
