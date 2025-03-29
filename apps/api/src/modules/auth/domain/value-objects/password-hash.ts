import * as bcrypt from 'bcrypt';

export class PasswordHash {
  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  static async create(value: string): Promise<PasswordHash> {
    const passwordHash = await bcrypt.hash(value, 10);
    return new PasswordHash(passwordHash);
  }

  async isValid(password: string): Promise<boolean> {
    return bcrypt.compare(password, this._value);
  }

  static reconstruct(value: string): PasswordHash {
    return new PasswordHash(value);
  }
}
