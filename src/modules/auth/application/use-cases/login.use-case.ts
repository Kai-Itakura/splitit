import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  AuthUserRepositoryToken,
  IAuthUserRepository,
} from '../../domain/repositories/auth-user.repository.interface';
import { LoginAuthDto } from '../../presentation/dto/auth.dto';
import {
  ITokenGenerator,
  TokenGeneratorToken,
  TokenPair,
} from '../interfaces/token-generator.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(AuthUserRepositoryToken)
    private readonly authUserRepository: IAuthUserRepository,
    @Inject(TokenGeneratorToken)
    private readonly tokenGenerator: ITokenGenerator,
  ) {}

  async execute(dto: LoginAuthDto): Promise<TokenPair> {
    const authUser = await this.authUserRepository.findByEmail(dto.email);
    if (!authUser) throw new UnauthorizedException('User not found!');

    // パスワードの検証
    const isValid = await authUser.isValidPassword(dto.password);
    if (!isValid) throw new UnauthorizedException('Password is invalid!');

    // トークンペアを作成
    const tokenPair = await this.tokenGenerator.generateTokenPair({
      userId: authUser.id,
    });
    authUser.addRefreshToken(
      tokenPair.refreshToken.value,
      tokenPair.refreshToken.expiresAt,
    );
    await this.authUserRepository.update(authUser);

    return tokenPair;
  }
}
