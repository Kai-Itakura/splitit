import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IAuthUserRepository,
  IAuthUserRepositoryToken,
} from '../../domain/repositories/auth-user.repository.interface';
import { AuthDTO } from '../dto/auth.dto';
import {
  ITokenGenerator,
  TokenPair,
} from '../interfaces/token-generator.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(IAuthUserRepositoryToken)
    private readonly authUserRepository: IAuthUserRepository,
    @Inject(ITokenGenerator) private readonly tokenGenerator: ITokenGenerator,
  ) {}

  async execute(dto: AuthDTO): Promise<TokenPair> {
    const authUser = await this.authUserRepository.findByEmail(dto.email);
    if (!authUser) throw new UnauthorizedException('User not found!');

    // パスワードの検証
    const isValid = await authUser.isValidPassword(dto.password);
    if (!isValid) throw new UnauthorizedException('Password is invalid!');

    // 新しいトークンペアを作成
    const tokenPair = await this.tokenGenerator.generateTokenPair({
      userId: authUser.id,
    });

    return tokenPair;
  }
}
