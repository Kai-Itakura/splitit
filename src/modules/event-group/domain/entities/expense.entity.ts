import { Id } from 'src/modules/shared/value-objects/id';
import { Amount } from '../value-objects/amount';
import { GroupUser } from './group-user.entity';

export class Expense {
  private constructor(
    private readonly _id: Id,
    private readonly _title: string,
    private readonly _amount: Amount,
    private readonly _payer: GroupUser,
    private readonly _payees: GroupUser[],
  ) {}

  static create(
    title: string,
    amount: number,
    payer: GroupUser,
    payees: GroupUser[],
  ): Expense {
    return new Expense(
      Id.create(),
      title,
      Amount.create(amount),
      payer,
      payees,
    );
  }
}
