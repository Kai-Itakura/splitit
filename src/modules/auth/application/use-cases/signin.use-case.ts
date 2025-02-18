import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms, { StringValue } from 'ms';
import { AuthUser } from '../../domain/entities/auth-user.entity';
import { RefreshToken } from '../../domain/entities/refresh-token.entity';
import {
  IAuthUserRepository,
  IAuthUserRepositoryToken,
} from '../../domain/repositories/auth-user.repository.interface';
import {
  IRefreshTokenRepository,
  IRefreshTokenRepositoryToken,
} from '../../domain/repositories/refresh-token.repository.interface';
import { AuthDTO } from '../dto/auth.dto';

export interface JwtPayload {
  id: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: {
    value: string;
    exp: number;
  };
}

@Injectable()
export class SigninUseCase {
  constructor(
    @Inject(IAuthUserRepositoryToken)
    private readonly authUserRepository: IAuthUserRepository,
    @Inject(IRefreshTokenRepositoryToken)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(dto: AuthDTO): Promise<TokenPair> {
    // ユーザーの新規作成
    const authUser = await AuthUser.create(dto.email, dto.password);
    await this.authUserRepository.create(authUser);

    // JWT生成
    const payload = { id: authUser.id };
    const [accessToken, refreshToken] = await this.generateTokenPair(payload);
    const refreshTokenExp = ms(
      this.configService.get<StringValue>('REFRESH_TOKEN_EXP')!,
    );

    // リフレッシュトークンの保存
    const expiresAt = new Date();
    expiresAt.setMilliseconds(expiresAt.getMilliseconds() + refreshTokenExp);
    const newRefreshToken = RefreshToken.create(
      refreshToken,
      expiresAt,
      authUser.id,
    );
    await this.refreshTokenRepository.create(newRefreshToken);

    return {
      accessToken,
      refreshToken: { value: refreshToken, exp: refreshTokenExp },
    };
  }

  private async generateTokenPair(payload: JwtPayload) {
    return Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('ACCESS_TOKEN_EXP'),
        secret: this.configService.get('JWT_SECRET'),
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('REFRESH_TOKEN_EXP'),
        secret: this.configService.get('REFRESH_JWT_SECRET'),
      }),
    ]);
  }
}
