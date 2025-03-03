import { Id } from 'src/modules/shared/value-objects/id';
import { ReconstructRefreshToken } from '../types/reconstruct-refresh-token.type';
import { PasswordHash } from '../value-objects/password-hash';
import { RefreshToken } from './refresh-token.entity';

export class AuthUser {
  private readonly _newRefreshTokens: RefreshToken[] = [];

  private constructor(
    private readonly _id: Id,
    private readonly _email: string,
    private readonly _passwordHash: PasswordHash,
    private readonly _refreshTokens: RefreshToken[] = [],
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

  get refreshTokens(): RefreshToken[] {
    return this._refreshTokens;
  }

  static reconstruct(
    id: string,
    email: string,
    passwordHash: string,
    reconstructRefreshTokens: ReconstructRefreshToken[],
  ): AuthUser {
    return new AuthUser(
      Id.reconstruct(id),
      email,
      PasswordHash.reconstruct(passwordHash),
      reconstructRefreshTokens.map(({ id, token, expiresAt }) =>
        RefreshToken.reconstruct(id, token, expiresAt),
      ),
    );
  }

  async isValidPassword(password: string): Promise<boolean> {
    return this._passwordHash.isValid(password);
  }

  addRefreshToken(token: string, expiresAt: Date): void {
    const newRefreshToken = RefreshToken.create(token, expiresAt);
    this._refreshTokens.push(newRefreshToken);
    this._newRefreshTokens.push(newRefreshToken);
  }

  get newRefreshTokens(): RefreshToken[] {
    return this._newRefreshTokens;
  }
}
