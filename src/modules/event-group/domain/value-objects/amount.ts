import { BadRequestException } from '@nestjs/common';

export class Amount {
  private constructor(private readonly _value: number) {}

  static create(value: number): Amount {
    this.validate(value);
    return new Amount(value);
  }

  private static validate(value: number): void {
    if (!Number.isInteger(value))
      throw new BadRequestException('Amount must be integer!');
  }

  get value(): number {
    return this._value;
  }
}
