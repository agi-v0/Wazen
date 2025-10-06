import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { createClient } from 'next-sanity'
import groq from 'groq'

type Redirect = {
	_updatedAt: string
	destination: string
	permanent: boolean
	source: string
}

const intlMiddleware = createMiddleware(routing)

const PUBLIC_FILE = /\.(.*)$/

// Create Sanity client for middleware
const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-02',
	useCdn: true,
	perspective: 'published',
})

// Cache for redirects with TTL
let redirectsCache: { data: Redirect[] | null; timestamp: number } = {
	data: null,
	timestamp: 0,
}
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

async function getRedirects() {
	const now = Date.now()

	// Return cached data if it's still valid
	if (redirectsCache.data && now - redirectsCache.timestamp < CACHE_TTL) {
		return redirectsCache.data
	}

	try {
		const redirects = await client.fetch<Redirect[]>(
			groq`*[_type == 'redirect']`,
		)
		redirectsCache = { data: redirects || [], timestamp: now }
		return redirects || []
	} catch (error) {
		console.warn('Failed to fetch redirects: ', error)
		// Return cached data even if expired, or empty array
		return redirectsCache.data || []
	}
}

// Helper function to normalize paths for comparison
function normalizePath(path: string): string {
	// Remove trailing slash unless it's the root path
	return path === '/' ? path : path.replace(/\/$/, '')
}

export default async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	// Skip middleware for static files and specific paths
	if (
		PUBLIC_FILE.test(pathname) ||
		pathname.startsWith('/admin') ||
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api')
	) {
		return NextResponse.next()
	}

	// Check for redirects before running intl middleware
	const redirects = await getRedirects()

	if (redirects.length > 0) {
		for (const redirect of redirects) {
			let { source, destination, permanent } = redirect

			// Normalize source to ensure it starts with /
			const normalizedSource = source.startsWith('/')
				? encodeURI(source)
				: '/' + encodeURI(source)

			// Check for exact match first (with trailing slash normalization)
			if (normalizePath(pathname) === normalizePath(normalizedSource)) {
				return NextResponse.redirect(
					new URL(destination, request.url),
					permanent ? 308 : 307,
				)
			}

			// Check for locale-prefixed matches
			// Extract potential locale from pathname (e.g., /ar/our-pricing -> ar, our-pricing)
			const pathParts = pathname.split('/').filter(Boolean)

			if (pathParts.length > 0) {
				const potentialLocale = pathParts[0]
				const restOfPath = pathParts.slice(1).join('/')

				// If first part is a valid locale, check if the rest matches the redirect source
				if (routing.locales.includes(potentialLocale as any)) {
					const pathWithoutLocale = '/' + restOfPath
					const sourceWithoutLocale = normalizedSource

					// Check if the rest of the path matches the redirect source
					if (
						normalizePath(pathWithoutLocale) ===
						normalizePath(sourceWithoutLocale)
					) {
						// Preserve locale in destination if destination doesn't already include it
						let finalDestination = destination
						if (
							!destination.startsWith(`/${potentialLocale}/`) &&
							!destination.startsWith('http')
						) {
							finalDestination = `/${potentialLocale}${destination.startsWith('/') ? '' : '/'}${destination}`
						}
						request.nextUrl.pathname = finalDestination
					}
				}
			}
		}
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
