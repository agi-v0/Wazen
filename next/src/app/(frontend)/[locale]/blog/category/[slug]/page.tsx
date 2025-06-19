import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { creativeModuleQuery } from '@/sanity/lib/queries'
import Modules from '@/components/modules'
import processMetadata from '@/lib/processMetadata'
import { setRequestLocale } from 'next-intl/server'
import BlogList from '@/components/modules/blog/BlogList'
import { notFound } from 'next/navigation'
import { slugify } from '@/lib/slugify'
import { client } from '@/sanity/lib/client'

type Props = {
	params: Promise<{ locale: 'en' | 'ar'; slug: string }>
}

export default async function CategoryPage({ params }: Props) {
	const resolvedParams = await params
	setRequestLocale(resolvedParams.locale)

	const [categoryData, blogData, page] = await Promise.all([
		getCategory(resolvedParams.slug, resolvedParams.locale),
		getBlogPostsByCategory(resolvedParams.slug, resolvedParams.locale),
		getPage(resolvedParams.locale),
	])

	if (!categoryData) {
		notFound()
	}

	return (
		<>
			<Modules
				modules={page?.modules}
				locale={resolvedParams.locale}
				slug={resolvedParams.slug}
			/>
			<BlogList
				locale={resolvedParams.locale}
				initialPosts={blogData.posts}
				totalCount={blogData.totalCount}
				categoryRef={categoryData._id}
			/>
		</>
	)
}

export async function generateMetadata({ params }: Props) {
	const resolvedParams = await params
	const category = await client.fetch<Sanity.BlogCategory>(
		groq`*[_type == 'blog.category' && slug.current == $slug][0] {
			title
		}`,
		{
			slug: resolvedParams.slug,
		},
	)

	if (!category) {
		return {
			title: 'Category Not Found',
			description: 'The requested category could not be found.',
		}
	}

	const title =
		resolvedParams.locale === 'en'
			? category.title?.en || category.title
			: category.title?.ar || category.title

	return {
		title: `${title} - Blog`,
		description: `Browse blog posts in the ${title} category`,
	}
}

export async function generateStaticParams() {
	// Get all categories
	const categories = await client.fetch<Sanity.BlogCategory[]>(
		groq`*[_type == 'blog.category'] {
			title
		}`,
	)

	const params = []

	// Generate slugs for both locales
	for (const category of categories) {
		// English locale with slugified English title
		params.push({
			locale: 'en' as const,
			slug: encodeURIComponent(slugify(category.title.en)),
		})

		// Arabic locale with slugified Arabic title
		params.push({
			locale: 'ar' as const,
			slug: encodeURIComponent(slugify(category.title.ar)),
		})
	}

	return params
}

async function getCategory(slug: string, locale: 'en' | 'ar') {
	// Decode the URL-encoded slug
	const decodedSlug = decodeURIComponent(slug)

	// Get all categories and find the one that matches the slug
	const categories = await client.fetch<Sanity.BlogCategory[]>(
		groq`*[_type == 'blog.category']{
			_id,
			title,
			slug
		}`,
	)

	// Find category by comparing slugified titles (both encoded and decoded versions)
	return categories.find((category: any) => {
		const enSlug = slugify(category.title.en)
		const arSlug = slugify(category.title.ar)

		// Check against both original slug and decoded slug
		return (
			enSlug === slug ||
			arSlug === slug ||
			enSlug === decodedSlug ||
			arSlug === decodedSlug
		)
	})
}

async function getBlogPostsByCategory(
	categorySlug: string,
	locale: 'en' | 'ar',
) {
	const type = locale === 'en' ? 'blog.post.en' : 'blog.post'
	const POSTS_PER_PAGE = 9

	// First get the category ID
	const category = await getCategory(categorySlug, locale)
	if (!category) {
		return { posts: [], totalCount: 0 }
	}

	const [posts, totalCount] = await Promise.all([
		fetchSanityLive({
			query: groq`*[_type == $type && $categoryId in categories[]->_id] | order(publishDate desc) [0...$limit] {
				title,
				publishDate,
				metadata,
				body,
				categories[]->{
					title
				}
			}`,
			params: {
				type,
				categoryId: category._id,
				limit: POSTS_PER_PAGE,
			},
			tags: ['blog'],
		}),
		fetchSanityLive({
			query: groq`count(*[_type == $type && $categoryId in categories[]->_id])`,
			params: {
				type,
				categoryId: category._id,
			},
			tags: ['blog'],
		}),
	])

	return {
		posts,
		totalCount,
	}
}

async function getPage(locale: 'en' | 'ar') {
	return await fetchSanityLive({
		query: groq`*[_type == 'page' && metadata.slug.current == "blog" && language == '${locale}'][0]{
			...,
			modules[]{
				...,
				ctas[]{
					...,
					link{
						...,
						internal->{ title, metadata }
					}
				},
				products[]{
					...,
						link{
							...,
							internal->{ title, metadata },
					}
				},
				_type == 'faq-list' => {
          sideNote {
            ...,
            link {
              ...,
              internal->{ title, metadata }
            }
          }
        },
				categories[]->{title},
				logos[]->,
				plans[]->,
				partnerslogos[]->,
				testimonials[]->,
				items[]->,
				${creativeModuleQuery}
			},
			metadata {
				...,
				'ogimage': image.asset->url
			}
		}`,
		params: {},
		tags: ['page'],
	})
}
