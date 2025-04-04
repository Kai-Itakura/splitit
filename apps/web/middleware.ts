import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('🔥 ~ request:', request.nextUrl);
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
