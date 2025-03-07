import { CurrentUser } from '../../decorators/types/current-user.type';

export interface TokenPair {
  accessToken: {
    value: string;
  };
  refreshToken: {
    value: string;
    expiresAt: Date;
  };
}

export interface ITokenGenerator {
  generateTokenPair(payload: CurrentUser): Promise<TokenPair>;
}

export const TokenGeneratorToken = Symbol('ITokenGenerator');
