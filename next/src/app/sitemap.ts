import { fetchSanity, groq } from '@/sanity/lib/fetch'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const allPages = await fetchSanity<Record<string, MetadataRoute.Sitemap>>({
		query: groq`{
			'pages': *[
				_type == 'page' && language == 'ar' &&
				!(metadata.slug.current in ['404']) &&
				metadata.noIndex != true
			]|order(metadata.slug.current)
			{
				'url': $baseUrl  + select(metadata.slug.current == 'index' => '', metadata.slug.current),
				'lastModified': _updatedAt,
				'alternates': {
					'languages': {
						'en': $baseUrl + 'en/' + select(metadata.slug.current == 'index' => '', metadata.slug.current),
						'ar': $baseUrl + 'ar/' + select(metadata.slug.current == 'index' => '', metadata.slug.current)
					}
				},
				'priority': select(
					metadata.slug.current == 'index' => 1,
					0.5
				),
			},
		
			'posts': *[
				_type == 'blog.post' || _type == 'blog.post.en' &&
				metadata.noIndex != true
			]|order(name)
			{
				'url': $baseUrl + 'blog/' + metadata.slug.current,
				'lastModified': _updatedAt,
				'alternates': {
					'languages': {
						'en': $baseUrl + 'en/blog/' + select(metadata.slug.current == 'index' => '', metadata.slug.current),
						'ar': $baseUrl + 'ar/blog/' + select(metadata.slug.current == 'index' => '', metadata.slug.current)
					}
				},
				'priority': 0.4,
			},
			'guides': *[
				_type == 'help.center.post' || _type == 'help.center.post.en' &&
					
				metadata.noIndex != true
			]|order(name)
			{
				'url': $baseUrl + 'help-center/' + metadata.slug.current,
				'lastModified': _updatedAt,
				'alternates': {
					'languages': {
						'en': $baseUrl + 'en/help-center/' + select(metadata.slug.current == 'index' => '', metadata.slug.current),
						'ar': $baseUrl + 'ar/help-center/' + select(metadata.slug.current == 'index' => '', metadata.slug.current)
					}
				},
				'priority': 0.4,
			},
			'integrations': *[
				_type == 'app.store.app' &&
					
				metadata.noIndex != true
			]|order(name)
			{
				'url': $baseUrl + 'integrations/' + metadata.slug.current,
				'lastModified': _updatedAt,
				'alternates': {
					'languages': {
						'en': $baseUrl + 'en/integrations/' + select(metadata.slug.current == 'index' => '', metadata.slug.current),
						'ar': $baseUrl + 'ar/integrations/' + select(metadata.slug.current == 'index' => '', metadata.slug.current)
					}
				},
				'priority': 0.4,
			}
		}`,

		params: {
			baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
		},
	})
	return Object.values(allPages).flat()
}
