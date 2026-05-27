import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/app/(contents)/constants/token';
import { TokenPair } from '@/openapi/response.type';
import { cookies } from 'next/headers';

type ResponseCookieOptions = NonNullable<
  Parameters<Awaited<ReturnType<typeof cookies>>['set']>[2]
>;

type SessionCookies = {
  accessToken: Cookie;
  refreshToken: Cookie;
};

type Cookie = {
  name: string;
  value: string;
  options?: ResponseCookieOptions;
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

export const setResponseCookies = async (session: TokenPair): Promise<void> => {
  const responseCookies = await cookies();
  const { accessToken, refreshToken } = generateAuthCookies(session);
  responseCookies.set(accessToken.name, accessToken.value, accessToken.options);
  responseCookies.set(
    refreshToken.name,
    refreshToken.value,
    refreshToken.options,
  );
};
