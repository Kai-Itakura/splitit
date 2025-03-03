import { Id } from 'src/modules/shared/value-objects/id';

export class RefreshToken {
  private constructor(
    private readonly _id: Id,
    private readonly _token: string,
    private readonly _expiresAt: Date,
  ) {}

  static create(token: string, expiresAt: Date): RefreshToken {
    return new RefreshToken(Id.create(), token, expiresAt);
  }

  get id(): string {
    return this._id.value;
  }

  get token(): string {
    return this._token;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }

  static reconstruct(id: string, token: string, expiresAt: Date): RefreshToken {
    return new RefreshToken(Id.reconstruct(id), token, expiresAt);
  }

  isExpired(): boolean {
    return this.expiresAt < new Date();
  }
}
