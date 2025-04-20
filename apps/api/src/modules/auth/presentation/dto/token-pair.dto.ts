export class TokenPair {
  accessToken: {
    value: string;
    expiresAt: Date;
  };
  refreshToken: {
    value: string;
    expiresAt: Date;
  };
}
