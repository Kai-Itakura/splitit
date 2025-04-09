import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/app/constants/token';
import { Result } from '@/app/types/result.type';
import { post } from '@/app/util/fetch';
import { cookies } from 'next/headers';

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

type Message = {
  message: string;
};

const setCookies = async (session: TokenPair) => {
  const requestCookies = await cookies();

  requestCookies.set(ACCESS_TOKEN_COOKIE_NAME, session.accessToken.value, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    expires: new Date(session.accessToken.expiresAt),
    path: '/',
  });

  requestCookies.set(REFRESH_TOKEN_COOKIE_NAME, session.refreshToken.value, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    expires: new Date(session.refreshToken.expiresAt),
    path: '/',
  });
};

export const authFetch = async <T>(
  path: string,
  body: T,
  requestInit: RequestInit = {},
): Promise<Result<Message>> => {
  const result = await post<T, TokenPair>(path, body, requestInit);

  if (!result.ok) {
    return result;
  }

  await setCookies(result.data);
  return { ok: true, data: { message: '認証成功' } };
};
