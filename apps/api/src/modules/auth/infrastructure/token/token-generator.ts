import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms, { StringValue } from 'ms';
import {
  ITokenGenerator,
  TokenPair,
} from '../../application/interfaces/token-generator.interface';
import { CurrentUserType } from '../../decorators/types/current-user.type';

@Injectable()
export class TokenGenerator implements ITokenGenerator {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokenPair(payload: CurrentUserType): Promise<TokenPair> {
    const accessTokenExp =
      this.configService.getOrThrow<StringValue>('ACCESS_TOKEN_EXP');
    const accessTokenExpiresAt = this.getExpirationDate(accessTokenExp);
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: accessTokenExp,
      secret: this.configService.get('JWT_SECRET'),
    });

    const refreshTokenExp =
      this.configService.getOrThrow<StringValue>('REFRESH_TOKEN_EXP');
    const refreshTokenExpiresAt = this.getExpirationDate(refreshTokenExp);

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: refreshTokenExp,
      secret: this.configService.get('REFRESH_JWT_SECRET'),
    });

    return {
      accessToken: {
        value: accessToken,
        expiresAt: accessTokenExpiresAt,
      },
      refreshToken: {
        value: refreshToken,
        expiresAt: refreshTokenExpiresAt,
      },
    };
  }

  private getExpirationDate(exp: StringValue): Date {
    const expNum = ms(exp);
    const expirationDate = new Date();
    expirationDate.setMilliseconds(expirationDate.getMilliseconds() + expNum);

    return expirationDate;
  }
}
