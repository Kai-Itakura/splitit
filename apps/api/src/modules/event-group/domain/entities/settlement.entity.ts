import { Id } from 'src/shared/domain/value-objects/id';
import { Amount } from '../value-objects/amount';

export class Settlement {
  private constructor(
    private readonly _id: Id,
    private readonly _payeeId: string,
    private readonly _payerId: string,
    private _amount: Amount,
    private readonly _isSettled = false,
  ) {}

  static create(payeeId: string, payerId: string, amount: number): Settlement {
    return new Settlement(Id.create(), payeeId, payerId, Amount.create(amount));
  }

  static reconstruct(
    id: string,
    payeeId: string,
    payerId: string,
    amount: number,
  ): Settlement {
    return new Settlement(
      Id.reconstruct(id),
      payeeId,
      payerId,
      Amount.create(amount),
    );
  }

  get id(): string {
    return this._id.value;
  }

  get payeeId(): string {
    return this._payeeId;
  }

  get payerId(): string {
    return this._payerId;
  }

  get amount(): number {
    return this._amount.value;
  }

  get isSettled(): boolean {
    return this._isSettled;
  }
}
