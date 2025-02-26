import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
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
import {
  ITokenGenerator,
  TokenPair,
} from '../interfaces/token-generator.interface';

export interface JwtPayload {
  id: string;
}

@Injectable()
export class SigninUseCase {
  constructor(
    @Inject(IAuthUserRepositoryToken)
    private readonly authUserRepository: IAuthUserRepository,
    @Inject(IRefreshTokenRepositoryToken)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    @Inject(ITokenGenerator) private readonly tokenGenerator: ITokenGenerator,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(dto: AuthDTO): Promise<TokenPair> {
    // ユーザーの新規作成
    const authUser = await AuthUser.create(dto.email, dto.password);
    await this.authUserRepository.create(authUser);

    // JWT生成
    const tokenPair = await this.tokenGenerator.generateTokenPair({
      userId: authUser.id,
    });

    // リフレッシュトークンの保存
    const newRefreshToken = RefreshToken.create(
      tokenPair.refreshToken.value,
      tokenPair.refreshToken.expiresAt,
      authUser.id,
    );
    await this.refreshTokenRepository.create(newRefreshToken);

    return tokenPair;
  }
}
