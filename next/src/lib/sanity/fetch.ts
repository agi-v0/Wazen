import client from '@/lib/sanity/client'
import type { QueryParams, ResponseQueryOptions } from 'next-sanity'

export { default as groq } from 'groq'

export function fetchSanity<T = any>(
	query: string,
	{
		params = {},
		...next
	}: {
		params?: QueryParams
	} & ResponseQueryOptions['next'] = {},
) {
	return client.fetch<T>(query, params, {
		stega: false,
		perspective: 'published',
		useCdn: true,
		next: {
			revalidate: 3600,
			...next,
		},
	})
}
