import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from './app/constants/token';
import { generateAuthCookies } from './app/util/set-request-cookies';
import { client } from './openapi.config';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    if (Date.now() > decoded.exp! * 1000) {
      // アクセストークンの有効期限切れ
      const refreshTokenCookie = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME);
      // リフレッシュトークンの有効期限切れ
      if (!refreshTokenCookie) {
        return NextResponse.redirect(new URL('/login', request.url), {
          status: 303,
        });
      }

      const { error, data } = await client.POST('/auth/refresh');
      if (error) {
        return NextResponse.redirect(new URL('/login', request.url), {
          status: 303,
        });
      }
      // リフレッシュ成功時は新しいセッション情報をcookieにセット
      const response = NextResponse.next();
      const tokenPair = generateAuthCookies(data);
      response.cookies.set(tokenPair.accessToken);
      response.cookies.set(tokenPair.refreshToken);
      return response;
    }
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
