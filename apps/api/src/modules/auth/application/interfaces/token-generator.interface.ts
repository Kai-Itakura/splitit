import { CurrentUserType } from '../../decorators/types/current-user.type';

export interface TokenPair {
  accessToken: {
    value: string;
    expiresAt: Date;
  };
  refreshToken: {
    value: string;
    expiresAt: Date;
  };
}

export interface ITokenGenerator {
  generateTokenPair(payload: CurrentUserType): Promise<TokenPair>;
}

export const TokenGeneratorToken = Symbol('ITokenGenerator');
