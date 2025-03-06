import { Amount } from '../value-objects/amount';

export class SettleMent {
  private constructor(
    private readonly _receiverId: string,
    private readonly _payerId: string,
    private readonly amount: Amount,
  ) {}

  static create(
    receiverId: string,
    payerId: string,
    amount: number,
  ): SettleMent {
    return new SettleMent(receiverId, payerId, Amount.create(amount));
  }
}
