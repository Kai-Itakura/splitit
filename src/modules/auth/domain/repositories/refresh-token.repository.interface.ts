import { RefreshToken } from '../entities/refresh-token.entity';

export interface IRefreshTokenRepository {
  create(refreshToken: RefreshToken): Promise<void>;
}

export const IRefreshTokenRepositoryToken = Symbol('IRefreshTokenRepository');
