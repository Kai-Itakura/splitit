import { post } from '@/app/util/fetch';
import {
  generateAuthCookies,
  TokenPair,
} from '@/app/util/generate-auth-cookies';
import { fail, isFail, ok, Result } from '@/app/util/result';
import { cookies } from 'next/headers';

type Message = {
  message: string;
};

/**
 * 認証情報が返ってくるAPIへのPOSTリクエスト
 */
export const authFetch = async <T>(
  path: string,
  body: T,
  requestInit: RequestInit = {},
): Promise<Result<Message>> => {
  const result = await post<T, TokenPair>(path, body, requestInit);

  if (isFail(result)) {
    return fail(result.error);
  }

  // レスポンスでcookieを返却
  const authCookies = generateAuthCookies(result.data);
  const requestCookies = await cookies();
  requestCookies.set(authCookies.accessToken);
  requestCookies.set(authCookies.refreshToken);

  return ok({ message: '認証成功' });
};
