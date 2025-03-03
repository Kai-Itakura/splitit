import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtRequestPayload } from '../strategy/type';

@Injectable()
export class TestGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const refreshToken = (<{ refresh_token: string }>request.cookies)
      .refresh_token;
    if (!refreshToken) throw new UnauthorizedException('Unauthorized');

    try {
      // jwt validation
      const payload: JwtRequestPayload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.getOrThrow('REFRESH_JWT_SECRET'),
        },
      );

      // Refresh token reuse detection
      // const usedRefreshToken =
      //   await this.refreshTokenRepository.findByToken(refreshToken);
      // if (!usedRefreshToken) {
      //   throw new UnauthorizedException('Unauthorized');
      // }

      request.user = payload;

      return true;
    } catch (error) {
      console.error('🔥 ERROR:', error);
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
