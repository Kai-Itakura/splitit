import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {
  IAuthUserRepository,
  IAuthUserRepositoryToken,
} from '../domain/repositories/auth-user.repository.interface';
import { JwtRequestPayload } from '../strategy/type';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(
    @Inject(IAuthUserRepositoryToken)
    private readonly authUserRepository: IAuthUserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const refreshToken = (<{ refresh_token: string }>request.cookies)
      .refresh_token;
    if (!refreshToken) throw new UnauthorizedException('Unauthorized!');

    try {
      // jwt validation
      const payload: JwtRequestPayload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.getOrThrow('REFRESH_JWT_SECRET'),
        },
      );

      // Refresh token reuse detection
      const authUser = await this.authUserRepository.findById(payload.userId);
      if (!authUser) throw new UnauthorizedException('Unauthorized!');
      const currentRefreshToken = authUser.getRefreshToken(refreshToken);
      if (!currentRefreshToken) {
        authUser.removeAllRefreshTokens();
        await this.authUserRepository.update(authUser);
        throw new UnauthorizedException('Unauthorized!');
      }

      // remove used refresh token
      authUser.removeRefreshToken(refreshToken);
      await this.authUserRepository.update(authUser);

      request.user = payload;

      return true;
    } catch (error) {
      console.error('🔥 ERROR:', error);
      throw new UnauthorizedException('Unauthorized!');
    }
  }
}
