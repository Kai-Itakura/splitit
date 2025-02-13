import { User } from 'src/modules/user/domain/entities/user.entity';

export class AuthEntity {
  private constructor(
    private readonly _id: string,
    private readonly _refreshToken: string,
    private readonly _expiresAt: Date,
    private readonly _used: boolean,
    private readonly _user: User,
  ) {}

  // static create(refreshToken: string, expiresAt: Date, used: boolean = false) {
  //   return new AuthEntity();
  // }
}
