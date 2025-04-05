import { client } from '@/sanity/lib/client'
import type { QueryParams, ResponseQueryOptions } from 'next-sanity'

export { default as groq } from 'groq'

export function fetchSanity<T = any>({
	query,
	params = {},
	revalidate = 60, // default revalidation time in seconds
	tags = [],
}: {
	query: string
	params?: QueryParams
	revalidate?: number | false
	tags?: string[]
}) {
	return client.fetch<T>(query, params, {
		stega: false,
		perspective: 'published',
		useCdn: true,
		next: {
			revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
			tags, // for tag-based revalidation
		},
	})
}
