import { BadRequestException } from '@nestjs/common';
import { Id } from 'src/modules/shared/value-objects/id';
import { Currency, CurrencyType } from '../value-objects/currency';
import { Expense } from './expense.entity';
import { SettleMent } from './settlement.entity';

export class EventGroup {
  private readonly _expenses: Expense[] = [];
  private _addedExpenseId: string;

  private readonly _settlements: SettleMent[] = [];

  private _addedUserId: string;

  private constructor(
    private readonly _id: Id,
    private readonly _title: string,
    private readonly _memberIds: string[],
    private readonly _currency: Currency,
    private readonly _createdAt: Date,
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
  ) {
    return new EventGroup(
      Id.reconstruct(id),
      title,
      userIds,
      Currency.create(currency),
      createdAt,
    );
  }

  addMemberId(userId: string): void {
    this._memberIds.push(userId);
    this._addedUserId = userId;
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
    this._addedExpenseId = newExpense.id;
  }

  getExpense(expenseId: string): Expense | undefined {
    return this._expenses.find((expense) => expense.id === expenseId);
  }

  createSettlement(receiverId: string, payerId: string, amount: number) {
    this._settlements.push(SettleMent.create(receiverId, payerId, amount));
  }

  private isMember(userIds: string[]) {
    return userIds.some((userId) => this._memberIds.includes(userId));
  }

  // 子エンティティ変更追跡用
  // ----------------------
  get addedExpenseId(): string {
    return this._addedExpenseId;
  }

  get addedUserId(): string {
    return this._addedUserId;
  }
}
