import { Id } from 'src/modules/shared/value-objects/id';
import { PasswordHash } from '../value-objects/password-hash';

export class AuthUser {
  private constructor(
    private readonly _id: Id,
    private readonly _email: string,
    private readonly _passwordHash: PasswordHash,
  ) {}

  static async create(email: string, password: string) {
    return new AuthUser(
      Id.create(),
      email,
      await PasswordHash.create(password),
    );
  }

  get id(): string {
    return this._id.value;
  }

  get email(): string {
    return this._email;
  }

  get passwordHash(): string {
    return this._passwordHash.value;
  }

  static reconstruct(id: string, email: string, passwordHash: string) {
    return new AuthUser(
      Id.reconstruct(id),
      email,
      PasswordHash.reconstruct(passwordHash),
    );
  }

  async isValidPassword(password: string): Promise<boolean> {
    return this._passwordHash.isValid(password);
  }
}
