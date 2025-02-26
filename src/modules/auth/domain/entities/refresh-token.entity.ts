import { Id } from 'src/modules/shared/value-objects/id';

export class RefreshToken {
  private constructor(
    private readonly _id: Id,
    private readonly _token: string,
    private readonly _expiresAt: Date,
    private readonly _used: boolean,
    private readonly _userId: string,
  ) {}

  static create(
    token: string,
    expiresAt: Date,
    userId: string,
    used: boolean = false,
  ): RefreshToken {
    return new RefreshToken(Id.create(), token, expiresAt, used, userId);
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

  get used(): boolean {
    return this._used;
  }

  get userId(): string {
    return this._userId;
  }

  static reconstruct(
    id: string,
    token: string,
    expiresAt: Date,
    used: boolean,
    userId: string,
  ): RefreshToken {
    return new RefreshToken(Id.reconstruct(id), token, expiresAt, used, userId);
  }

  isExpired(): boolean {
    return this.expiresAt < new Date();
  }
}
