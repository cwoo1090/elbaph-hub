import {NextResponse, type NextRequest} from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

const LEGACY_LOCALE_PREFIX = /^\/(en|ko)(\/|$)/

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (LEGACY_LOCALE_PREFIX.test(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(LEGACY_LOCALE_PREFIX, '/')
    return NextResponse.redirect(url, 308)
  }

  return handleI18nRouting(request)
}

export const config = {
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
}
