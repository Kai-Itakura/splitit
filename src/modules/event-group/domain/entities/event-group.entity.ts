import { Id } from 'src/modules/shared/value-objects/id';
import { Currency, CurrencyType } from '../value-objects/currency';
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
    private readonly _createdAt: Date,
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

  get currency(): CurrencyType {
    return this._currency.value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get memberCount(): number {
    return this._userIds.length;
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
    currency: Currency,
    createdAt: Date,
  ) {
    return new EventGroup(
      Id.reconstruct(id),
      title,
      userIds,
      currency,
      createdAt,
    );
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
