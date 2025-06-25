import { fetchSanity } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

interface SitemapEntry {
	url: string
	lastModified: string
	alternates: {
		languages: {
			en: string
			ar: string
		}
	}
	priority: number
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Helper function to create alternates
const createAlternates = (path: string, slug: string) => ({
	languages: {
		en: `${BASE_URL}en/${path}${slug === 'index' ? '' : slug}`,
		ar: `${BASE_URL}ar/${path}${slug === 'index' ? '' : slug}`,
	},
})

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const query = groq`{
		'pages': *[
			_type == 'page' && 
			language == 'ar' &&
			!(metadata.slug.current in ['404']) &&
			metadata.noIndex != true
		] | order(metadata.slug.current) {
			'url': $baseUrl + select(
				metadata.slug.current == 'index' => '', 
				metadata.slug.current
			),
			'lastModified': _updatedAt,
			'slug': metadata.slug.current,
			'priority': select(
				metadata.slug.current == 'index' => 1,
				0.5
			),
		},
		
		'posts': *[
			(_type == 'blog.post' || _type == 'blog.post.en') &&
			metadata.noIndex != true
		] | order(name) {
			'url': $baseUrl + 'blog/' + metadata.slug.current,
			'lastModified': _updatedAt,
			'slug': metadata.slug.current,
			'priority': 0.4,
		},
		
		'guides': *[
			(_type == 'help.center.post' || _type == 'help.center.post.en') &&
			metadata.noIndex != true
		] | order(name) {
			'url': $baseUrl + 'help-center/' + metadata.slug.current,
			'lastModified': _updatedAt,
			'slug': metadata.slug.current,
			'priority': 0.4,
		},
		
		'integrations': *[
			_type == 'app.store.app' &&
			metadata.noIndex != true
		] | order(name) {
			'url': $baseUrl + 'integrations/' + metadata.slug.current,
			'lastModified': _updatedAt,
			'slug': metadata.slug.current,
			'priority': 0.4,
		}
	}`

	const data = await fetchSanity({
		query,
		params: { baseUrl: BASE_URL },
		next: { revalidate: 0 },
	})

	// Transform the data to add alternates
	const sitemap: MetadataRoute.Sitemap = []

	// Add pages
	data.pages?.forEach((page: any) => {
		sitemap.push({
			url: page.url,
			lastModified: new Date(page.lastModified),
			alternates: createAlternates('', page.slug),
			priority: page.priority,
		})
	})

	// Add blog posts
	data.posts?.forEach((post: any) => {
		sitemap.push({
			url: post.url,
			lastModified: new Date(post.lastModified),
			alternates: createAlternates('blog/', post.slug),
			priority: post.priority,
		})
	})

	// Add help center guides
	data.guides?.forEach((guide: any) => {
		sitemap.push({
			url: guide.url,
			lastModified: new Date(guide.lastModified),
			alternates: createAlternates('help-center/', guide.slug),
			priority: guide.priority,
		})
	})

	// Add integrations
	data.integrations?.forEach((integration: any) => {
		sitemap.push({
			url: integration.url,
			lastModified: new Date(integration.lastModified),
			alternates: createAlternates('integrations/', integration.slug),
			priority: integration.priority,
		})
	})

	return sitemap
}
