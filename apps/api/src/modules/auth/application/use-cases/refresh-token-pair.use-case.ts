import { Inject, Injectable } from '@nestjs/common';
import { CurrentUserType } from '../../../../decorators/types/current-user.type';
import {
  AuthUserRepositoryToken,
  IAuthUserRepository,
} from '../../domain/repositories/auth-user.repository.interface';
import { TokenPair } from '../../presentation/dto/token-pair.dto';
import {
  ITokenGenerator,
  TokenGeneratorToken,
} from '../interfaces/token-generator.interface';

@Injectable()
export class RefreshTokenPairUseCase {
  constructor(
    @Inject(TokenGeneratorToken)
    private readonly tokenGenerator: ITokenGenerator,
    @Inject(AuthUserRepositoryToken)
    private readonly authUserRepository: IAuthUserRepository,
  ) {}

  async execute(payload: CurrentUserType): Promise<TokenPair> {
    const newTokenPair = await this.tokenGenerator.generateTokenPair(payload);
    const authUser = await this.authUserRepository.findById(payload.userId);
    authUser.addRefreshToken(
      newTokenPair.refreshToken.value,
      newTokenPair.refreshToken.expiresAt,
    );
    await this.authUserRepository.update(authUser);

    return newTokenPair;
  }
}
