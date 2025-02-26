import { RefreshToken } from '../entities/refresh-token.entity';

export interface IRefreshTokenRepository {
  create(token: RefreshToken): Promise<void>;
  findByToken(token: string): Promise<RefreshToken | null>;
  delete(token: string): Promise<void>;
}

export const IRefreshTokenRepositoryToken = Symbol('IRefreshTokenRepository');
