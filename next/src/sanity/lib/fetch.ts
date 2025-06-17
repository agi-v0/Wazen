'use server'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'
import { dev } from '@/lib/env'
import { defineLive, type QueryOptions, type QueryParams } from 'next-sanity'

export async function fetchSanity<const QueryString extends string>({
	query,
	params = {},
	revalidate = 60,
	tags = [],
	pathKey, // New parameter for path-based caching
}: {
	query: QueryString
	params?: QueryParams
	revalidate?: number | false
	tags?: string[]
	pathKey?: string // Used to create path-specific cache keys
}) {
	const cacheOptions: RequestInit['cache'] = 'force-cache'

	// Create cache tags that include path information
	const cacheTags = pathKey ? [...tags, `path:${pathKey}`] : tags

	return client.fetch(query, params, {
		cache: cacheOptions,
		next: {
			revalidate: cacheTags.length ? false : revalidate,
			tags: cacheTags,
		},
	})
}
