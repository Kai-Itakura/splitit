import { Inject, Injectable } from '@nestjs/common';
import { CurrentUser } from '../../decorators/types/current-user.type';
import {
  IAuthUserRepository,
  IAuthUserRepositoryToken,
} from '../../domain/repositories/auth-user.repository.interface';
import {
  ITokenGenerator,
  ITokenGeneratorToken,
  TokenPair,
} from '../interfaces/token-generator.interface';

@Injectable()
export class RefreshTokenPairUseCase {
  constructor(
    @Inject(ITokenGeneratorToken)
    private readonly tokenGenerator: ITokenGenerator,
    @Inject(IAuthUserRepositoryToken)
    private readonly authUserRepository: IAuthUserRepository,
  ) {}

  async execute(payload: CurrentUser): Promise<TokenPair> {
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
