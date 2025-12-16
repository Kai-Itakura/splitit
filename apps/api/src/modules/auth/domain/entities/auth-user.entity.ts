import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { DomainEventStorable } from 'src/shared/domain/event/domain-event-storable';
import { Id } from 'src/shared/domain/value-objects/id';
import { CreateUserDomainEvent } from '../event/create-user.domain-event';
import { ReconstructRefreshToken } from '../types/reconstruct-refresh-token.type';
import { PasswordHash } from '../value-objects/password-hash';
import { RefreshToken } from './refresh-token.entity';

export class AuthUser extends DomainEventStorable {
  private _newRefreshToken: RefreshToken;
  private _allRefreshTokensRemoved: boolean;
  private _removedRefreshTokenId: string;

  private constructor(
    private readonly _id: Id,
    private _email: string,
    private _name: string,
    private _passwordHash: PasswordHash,
    private readonly _refreshTokens: RefreshToken[] = [],
  ) {
    super();
  }

  static async create(
    email: string,
    password: string,
    name: string,
  ): Promise<AuthUser> {
    const authUser = new AuthUser(
      Id.create(),
      email,
      name,
      await PasswordHash.create(password),
    );

    authUser.addEvent(
      new CreateUserDomainEvent({
        userName: authUser._name,
        email: authUser._email,
      }),
    );

    return authUser;
  }

  get id(): string {
    return this._id.value;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
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
    name: string,
    passwordHash: string,
    reconstructRefreshTokens: ReconstructRefreshToken[],
  ): AuthUser {
    return new AuthUser(
      Id.reconstruct(id),
      email,
      name,
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
    this._newRefreshToken = newRefreshToken;
  }

  getRefreshToken(token: string): RefreshToken | undefined {
    return this._refreshTokens.find(
      (refreshToken) => refreshToken.value === token,
    );
  }

  removeRefreshToken(token: string): void {
    const index = this._refreshTokens.findIndex(
      (refreshToken) => refreshToken.value === token,
    );

    if (index !== -1) {
      const removedRefreshToken = this._refreshTokens.splice(index, 1)[0];
      this._removedRefreshTokenId = removedRefreshToken!.id;
    }
  }

  removeAllRefreshTokens(): void {
    this._refreshTokens.length = 0;
    this._allRefreshTokensRemoved = true;
  }

  // 変更追跡用
  get newRefreshToken(): RefreshToken {
    return this._newRefreshToken;
  }
  get allRefreshTokensRemoved(): boolean {
    return this._allRefreshTokensRemoved;
  }
  get removedRefreshTokenId(): string {
    return this._removedRefreshTokenId;
  }

  async updatePassword(
    newPassword: string,
    confirmPassword: string,
    oldPassword: string,
  ) {
    const isValid = await this._passwordHash.isValid(oldPassword);
    if (!isValid) {
      throw new UnauthorizedException('パスワードが正しくありません。');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('確認用のパスワードが一致しません。');
    }

    this._passwordHash = await PasswordHash.create(newPassword);
  }
}
