import { cookies } from 'next/headers';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../constants/token';

export async function getCookieString(): Promise<string> {
  const requestCookies = await cookies();

  const accessToken = requestCookies.get(ACCESS_TOKEN_COOKIE_NAME);
  const refreshToken = requestCookies.get(REFRESH_TOKEN_COOKIE_NAME);

  const accessTokenString = accessToken
    ? `${accessToken.name}=${accessToken.value}; `
    : '';
  const refreshTokenString = refreshToken
    ? `${refreshToken.name}=${refreshToken.value}; `
    : '';

  return accessTokenString + refreshTokenString;
}
