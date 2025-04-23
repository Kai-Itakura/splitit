import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/app/constants/token';
import { TokenPair } from '@/openapi/response.type';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

type SessionCookies = {
  accessToken: Cookie;
  refreshToken: Cookie;
};

type Cookie = {
  name: string;
  value: string;
  options?: Partial<ResponseCookie>;
};

export const generateAuthCookies = (session: TokenPair): SessionCookies => {
  return {
    accessToken: {
      name: ACCESS_TOKEN_COOKIE_NAME,
      value: session.accessToken.value,
      options: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: new Date(session.accessToken.expiresAt),
        path: '/',
      },
    },
    refreshToken: {
      name: REFRESH_TOKEN_COOKIE_NAME,
      value: session.refreshToken.value,
      options: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: new Date(session.refreshToken.expiresAt),
        path: '/',
      },
    },
  };
};

export const setRequestCookies = async (session: TokenPair): Promise<void> => {
  const requestCookies = await cookies();
  const { accessToken, refreshToken } = generateAuthCookies(session);
  requestCookies.set(accessToken.name, accessToken.value, accessToken.options);
  requestCookies.set(
    refreshToken.name,
    refreshToken.value,
    refreshToken.options,
  );
};
