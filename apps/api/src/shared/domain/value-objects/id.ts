import { v4 as uuidV4 } from 'uuid';

export class Id {
  private constructor(private readonly _value: string) {}

  static create(): Id {
    return new Id(uuidV4());
  }

  static reconstruct(value: string): Id {
    return new Id(value);
  }

  get value(): string {
    return this._value;
  }
}
