import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms, { StringValue } from 'ms';
import {
  ITokenGenerator,
  TokenPair,
} from '../../application/interfaces/token-generator.interface';

@Injectable()
export class TokenGenerator implements ITokenGenerator {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokenPair(payload: { userId: string }): Promise<TokenPair> {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('ACCESS_TOKEN_EXP'),
      secret: this.configService.get('JWT_SECRET'),
    });

    const refreshTokenExp =
      this.configService.getOrThrow<StringValue>('REFRESH_TOKEN_EXP');
    const refreshTokenExpNum = ms(refreshTokenExp);
    const refreshTokenExpiresAt = new Date();
    refreshTokenExpiresAt.setMilliseconds(
      refreshTokenExpiresAt.getMilliseconds() + refreshTokenExpNum,
    );

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: refreshTokenExp,
      secret: this.configService.get('REFRESH_JWT_SECRET'),
    });

    return {
      accessToken: {
        value: accessToken,
      },
      refreshToken: {
        value: refreshToken,
        expiresAt: refreshTokenExpiresAt,
      },
    };
  }
}
