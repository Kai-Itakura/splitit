import { Id } from 'src/modules/shared/value-objects/id';
import { Amount } from '../value-objects/amount';

export class Expense {
  private constructor(
    private readonly _id: Id,
    private readonly _title: string,
    private readonly _amount: Amount,
    private readonly _payerId: string,
    private readonly _payeeIds: string[],
  ) {}

  static create(
    title: string,
    amount: number,
    payerId: string,
    payeeIds: string[],
  ): Expense {
    return new Expense(
      Id.create(),
      title,
      Amount.create(amount),
      payerId,
      payeeIds,
    );
  }
}
