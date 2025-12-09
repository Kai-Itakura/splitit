import { cookies } from 'next/headers';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '../(contents)/constants/token';

type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export async function getTokenPairFromCookie(): Promise<TokenPair> {
  const requestCookies = await cookies();

  const accessToken = requestCookies.get(ACCESS_TOKEN_COOKIE_NAME);
  const refreshToken = requestCookies.get(REFRESH_TOKEN_COOKIE_NAME);

  return {
    accessToken: accessToken ? accessToken.value : '',
    refreshToken: refreshToken ? refreshToken.value : '',
  };
}
