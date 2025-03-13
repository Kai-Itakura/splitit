import { BadRequestException } from '@nestjs/common';
import '@total-typescript/ts-reset/array-includes';

const CURRENCY_TYPES = ['JPY', 'USD', 'EUR'] as const;
export type CurrencyType = (typeof CURRENCY_TYPES)[number];

export class Currency {
  private constructor(private readonly _value: CurrencyType) {}

  static create(value: string): Currency {
    const isValid = this.validate(value);
    if (!isValid) throw new BadRequestException('Invalid string!');
    return new Currency(value);
  }

  private static validate(value: string): value is CurrencyType {
    return CURRENCY_TYPES.includes(value);
  }

  get value(): CurrencyType {
    return this._value;
  }
}
