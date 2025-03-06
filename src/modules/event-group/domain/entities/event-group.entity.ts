import { Id } from 'src/modules/shared/value-objects/id';
import { Currency } from '../types/currency.type';
import { Expense } from './expense.entity';
import { SettleMent } from './settlement.entity';

export class EventGroup {
  private readonly _expenses: Expense[] = [];
  private readonly _settlements: SettleMent[] = [];

  private constructor(
    private readonly _id: Id,
    private readonly _title: string,
    private readonly _userIds: string[],
    private readonly _currency: Currency,
  ) {}

  get id(): string {
    return this._id.value;
  }

  get title(): string {
    return this._title;
  }

  get userIds(): string[] {
    return [...this._userIds];
  }

  get currency(): Currency {
    return this._currency;
  }

  static create(title: string, userId: string, currency: Currency = 'JPY') {
    return new EventGroup(Id.create(), title, [userId], currency);
  }

  addUserId(userId: string): void {
    this._userIds.push(userId);
  }

  createExpense(
    title: string,
    amount: number,
    payerId: string,
    payeeIds: string[],
  ): void {
    this._expenses.push(Expense.create(title, amount, payerId, payeeIds));
  }

  createSettlement(receiverId: string, payerId: string, amount: number) {
    this._settlements.push(SettleMent.create(receiverId, payerId, amount));
  }
}
