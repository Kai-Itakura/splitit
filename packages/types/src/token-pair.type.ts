type TokenPair = {
  accessToken: {
    value: string;
    expiresAt: Date;
  };
  refreshToken: {
    value: string;
    expiresAt: Date;
  };
};

export type { TokenPair };
