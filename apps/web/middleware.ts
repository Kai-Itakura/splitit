import { NextRequest, NextResponse } from 'next/server';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from './app/(contents)/constants/token';
import { generateAuthCookies } from './app/util/set-request-cookies';
import { client } from './openapi.config';

export async function middleware(request: NextRequest) {
  const accessCookie = request.cookies.has(ACCESS_TOKEN_COOKIE_NAME);
  if (!accessCookie) {
    // アクセストークンの有効期限切れ
    const refreshCookie = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME);
    if (!refreshCookie) {
      // リフレッシュトークンの有効期限切れ
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const { error, data } = await client.POST('/auth/refresh');
    if (error) {
      // トークンリフレッシュ失敗
      return NextResponse.redirect(new URL('/login', request.url));
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
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - Login, Signup (authentication public routes)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login|signup).*)',
  ],
};
