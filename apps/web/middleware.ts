import { NextRequest, NextResponse } from 'next/server';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from './app/(contents)/constants/token';
import { generateAuthCookies } from './app/util/set-response-cookies';
import { client } from './openapi.config';

export async function middleware(request: NextRequest) {
  // GETリクエストのみを処理
  if (request.method !== 'GET') return NextResponse.next();

  const accessCookie = request.cookies.has(ACCESS_TOKEN_COOKIE_NAME);
  if (!accessCookie) {
    // アクセストークンの有効期限切れ
    const refreshCookie = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME);
    if (!refreshCookie) {
      // リフレッシュトークンの有効期限切れ
      return NextResponse.redirect(new URL('/login', request.url), {
        status: 303,
      });
    }

    const { error, data } = await client.POST('/auth/refresh', {
      body: {
        refreshToken: refreshCookie.value,
      },
    });
    if (error) {
      // トークンリフレッシュ失敗
      return NextResponse.redirect(new URL('/login', request.url), {
        status: 303,
      });
    }

    // リフレッシュ成功時は新しいセッション情報をcookieにセット;
    const response = NextResponse.next();
    const { accessToken, refreshToken } = generateAuthCookies(data);
    response.cookies.set(
      accessToken.name,
      accessToken.value,
      accessToken.options,
    );
    response.cookies.set(
      refreshToken.name,
      refreshToken.value,
      refreshToken.options,
    );
    return response;
  }
}

export const config = {
  matcher: ['/', '/event/:path*', '/profile/:path*'],
};
