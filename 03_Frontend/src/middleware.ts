import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['id', 'en'] as const;

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'id',
  localePrefix: 'never',
});

const IS_DEV = process.env.NODE_ENV === 'development';
const QA_BYPASS_LOGIN = IS_DEV && process.env.NEXT_PUBLIC_QA_BYPASS_LOGIN !== 'false';
const QA_DEFAULT_ROLE = process.env.NEXT_PUBLIC_QA_ROLE || 'admin';

const PROTECTED_ROUTES: Record<string, string[]> = {
  '/dashboard': ['admin'],
  '/reviews': ['admin'],
  '/models': ['model_owner', 'admin'],
};

const PUBLIC_ROUTES = ['/', '/login', '/ranking', '/access-denied'];

function getSafeRedirectPath(raw: string | null): string {
  if (!raw) return '/models';
  if (!raw.startsWith('/')) return '/models';
  if (raw.startsWith('//')) return '/models';
  return raw;
}

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function isAuthorized(pathname: string, role: string) {
  const match = Object.keys(PROTECTED_ROUTES)
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (!match) return true;
  return PROTECTED_ROUTES[match].includes(role);
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const roleFromQuery = request.nextUrl.searchParams.get('role');
  const redirectFromQuery = request.nextUrl.searchParams.get('redirect');
  const roleFromCookie = request.cookies.get('ai_sandbox_role')?.value;
  const role = roleFromQuery || roleFromCookie || (QA_BYPASS_LOGIN ? QA_DEFAULT_ROLE : 'model_owner');

  const intlResponse = intlMiddleware(request);

  if (QA_BYPASS_LOGIN && pathname === '/login') {
    const redirectPath = getSafeRedirectPath(redirectFromQuery);
    const redirectUrl = new URL(redirectPath, request.url);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set('ai_sandbox_role', role, { path: '/' });
    return response;
  }

  if (isPublicRoute(pathname)) {
    if (roleFromQuery && roleFromQuery !== roleFromCookie) {
      intlResponse.cookies.set('ai_sandbox_role', roleFromQuery, { path: '/' });
    }
    return intlResponse;
  }

  if (!isAuthorized(pathname, role)) {
    const deniedUrl = new URL(`/access-denied`, request.url);
    return NextResponse.redirect(deniedUrl);
  }

  if (roleFromQuery && roleFromQuery !== roleFromCookie) {
    intlResponse.cookies.set('ai_sandbox_role', roleFromQuery, { path: '/' });
  }

  return intlResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
