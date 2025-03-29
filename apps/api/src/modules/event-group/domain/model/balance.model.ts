export class Balance {
  private _amount: number;

  constructor(public readonly memberId: string) {
    this._amount = 0;
  }

  add(amount: number): void {
    this._amount += amount;
  }

  get amount(): number {
    return this._amount;
  }
}
