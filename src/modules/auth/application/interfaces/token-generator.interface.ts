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
  generateTokenPair(payload: { userId: string }): Promise<TokenPair>;
}

export const ITokenGenerator = Symbol('ITokenGenerator');
