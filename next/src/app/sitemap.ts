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

const locales = ['en', 'ar']

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
			(language == 'ar' || language == 'en') &&
			!(metadata.slug.current in ['404']) &&
			metadata.noIndex != true
		] | order(metadata.slug.current) {
			'url': $baseUrl + language + '/' + select(
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
			'url': $baseUrl + select(
				_type == 'blog.post.en' => 'en/',
				'ar/'
			) + 'blog/' + metadata.slug.current,
			'lastModified': _updatedAt,
			'slug': metadata.slug.current,
			'priority': 0.4,
		},

		'categories': *[
			_type == 'blog.category' &&
			metadata.noIndex != true
		] | order(name) {
			'url': $baseUrl + 'blog/category/' + slug.current,
			'lastModified': _updatedAt,
			'slug': slug.current,
			'priority': 0.4,
		},
		
		'guides': *[
			(_type == 'help.center.post' || _type == 'help.center.post.en') &&
			metadata.noIndex != true
		] | order(name) {
			'url': $baseUrl + select(
				_type == 'help.center.post.en' => 'en/',
				'ar/'
			) + 'help-center/' + metadata.slug.current,
			'lastModified': _updatedAt,
			'slug': metadata.slug.current,
			'priority': 0.4,
		},
		
		'integrations': *[
			_type == 'app.store.app' &&
			metadata.noIndex != true
		] | order(name) {
			'url': $baseUrl + select(language == 'en' => 'en/', 'ar/') + 'integrations/' + metadata.slug.current,
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
		const { url, lastModified, slug, priority } = page
		sitemap.push({
			url: url.split('/'),
			lastModified: new Date(lastModified),
			alternates: createAlternates('', slug),
			priority: priority,
		})
	})

	// Add blog posts
	data.posts?.forEach((post: any) => {
		const { url, lastModified, slug, priority } = post
		sitemap.push({
			url: url,
			lastModified: new Date(lastModified),
			alternates: createAlternates('blog/', slug),
			priority: priority,
		})
	})

	// Add blog categories
	data.categories?.forEach((category: any) => {
		const { url, lastModified, slug, priority } = category
		locales.forEach((locale) => {
			const segments = url.split('/')
			segments.splice(3, 0, locale)
			const newUrl = segments.join('/')
			sitemap.push({
				url: newUrl,
				lastModified: new Date(lastModified),
				alternates: createAlternates('blog/category/', slug),
				priority: priority,
			})
		})
	})

	// Add help center guides
	data.guides?.forEach((guide: any) => {
		const { url, lastModified, slug, priority } = guide
		sitemap.push({
			url: url,
			lastModified: new Date(lastModified),
			alternates: createAlternates('help-center/', slug),
			priority: priority,
		})
	})

	// Add integrations
	data.integrations?.forEach((integration: any) => {
		const { url, lastModified, slug, priority } = integration
		sitemap.push({
			url: url,
			lastModified: new Date(lastModified),
			alternates: createAlternates('integrations/', slug),
			priority: priority,
		})
	})

	return sitemap
}
