import { Inject, Injectable } from '@nestjs/common';
import {
  IRefreshTokenRepository,
  IRefreshTokenRepositoryToken,
} from '../../domain/repositories/refresh-token.repository.interface';

@Injectable()
export class RefreshTokenService {
  constructor(
    @Inject(IRefreshTokenRepositoryToken)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async isUsed(token: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByToken(token);
    return !refreshToken;
  }

  async delete(token: string): Promise<void> {
    await this.refreshTokenRepository.delete(token);
  }
}
