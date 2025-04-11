import { NextRequest, NextResponse } from 'next/server';
import { authFetch } from './app/(auth)/data-access/auth-fetch';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from './app/constants/token';

export async function middleware(request: NextRequest) {
  const isAccessTokenExist = request.cookies.has(ACCESS_TOKEN_COOKIE_NAME);
  // アクセストークンの有効期限切れ
  if (!isAccessTokenExist) {
    const refreshTokenCookie = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME);
    // リフレッシュトークンの有効期限切れ
    if (!refreshTokenCookie) {
      return NextResponse.redirect(new URL('/login', request.url), {
        status: 303,
      });
    }

    const result = await authFetch('auth/refresh', {});
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
