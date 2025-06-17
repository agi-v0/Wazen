import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const PUBLIC_FILE = /\.(.*)$/

export default function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Skip middleware for static files and specific paths
	if (
		PUBLIC_FILE.test(pathname) ||
		pathname.startsWith('/admin') ||
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api/revalidate-tag')
	) {
		return NextResponse.next()
	}

	// Run the next-intl middleware and return its response directly
	return intlMiddleware(request)
}

export const config = {
	matcher: [
		// Enable a redirect to a matching locale at the root
		'/',

		// Set a cookie to remember the previous locale for
		// all requests that have a locale prefix
		'/(ar|en)/:path*',

		// Enable redirects that add missing locales
		// (e.g. `/pathnames` -> `/en/pathnames`)
		'/((?!_next|_vercel|.*\\..*).*)',
	],
}
