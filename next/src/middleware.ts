import createMiddleware from 'next-intl/middleware'
import { localePrefix, defaultLocale, locales, pathnames } from './i18n/config'

// export default createMiddleware({
// 	defaultLocale,
// 	locales,
// 	localePrefix,
// 	pathnames,
// })

export default function middleware(request: any) {
	const { pathname } = request.nextUrl

	// Skip locale negotiation for the /admin path
	if (pathname.startsWith('/admin')) {
		return // Exit without calling middleware
	}

	// Apply locale middleware for other paths
	return createMiddleware({
		defaultLocale,
		locales,
		localePrefix,
		pathnames,
	})(request) // Call createMiddleware directly
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

		// '/((?!admin).*)',
	],
}
