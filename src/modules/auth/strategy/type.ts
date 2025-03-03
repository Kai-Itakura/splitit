export interface JwtRequestPayload {
  userId: string;
  iat: number;
  exp: number;
}
