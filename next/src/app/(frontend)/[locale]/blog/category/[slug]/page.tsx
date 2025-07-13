import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { creativeModuleQuery } from '@/sanity/lib/queries'
import Modules from '@/components/modules'
import BlogList from '@/components/modules/blog/BlogList'
import BlogPagination from '@/components/modules/blog/BlogPagination'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'

const POSTS_PER_PAGE = 18

type Props = {
	params: Promise<{ locale: 'en' | 'ar'; slug: string }>
}

export default async function CategoryPage({ params }: Props) {
	const resolvedParams = await params

	const [categoryData, blogData, page] = await Promise.all([
		getCategory(resolvedParams.slug, resolvedParams.locale),
		getBlogPostsByCategory(resolvedParams.slug, resolvedParams.locale),
		getPage(resolvedParams.locale),
	])

	if (!categoryData) {
		notFound()
	}

	const totalPages = Math.ceil(blogData.totalCount / POSTS_PER_PAGE)

	return (
		<>
			<Modules
				modules={page?.modules}
				locale={resolvedParams.locale}
				slug={resolvedParams.slug}
			/>
			<BlogList
				locale={resolvedParams.locale}
				posts={blogData.posts}
				emptyMessage={
					resolvedParams.locale === 'en'
						? 'No blog posts found in this category.'
						: 'لم يتم العثور على مقالات في هذه الفئة.'
				}
			/>
			{totalPages > 1 && (
				<div className="section py-8">
					<BlogPagination
						locale={resolvedParams.locale}
						currentPage={1}
						totalPages={totalPages}
						categorySlug={resolvedParams.slug}
					/>
				</div>
			)}
		</>
	)
}

export async function generateMetadata({ params }: Props) {
	const resolvedParams = await params
	const category = await client.fetch(
		groq`*[_type == 'blog.category' && slug.current == $slug][0] {
			title
		}`,
		{ slug: resolvedParams.slug },
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
	const categories = await client.fetch(
		groq`*[_type == 'blog.category'] {
			slug
		}`,
	)

	return categories.flatMap((category: Sanity.BlogCategory) => [
		{ locale: 'en', slug: category.slug?.current || '' },
		{ locale: 'ar', slug: category.slug?.current || '' },
	])
}

async function getCategory(slug: string, locale: 'en' | 'ar') {
	return client.fetch(
		groq`*[_type == 'blog.category' && slug.current == $slug][0]{
			_id,
			title,
			slug
		}`,
		{ slug },
	)
}

async function getBlogPostsByCategory(
	categorySlug: string,
	locale: 'en' | 'ar',
	page: number = 1,
) {
	const type = locale === 'en' ? 'blog.post.en' : 'blog.post'
	const offset = (page - 1) * POSTS_PER_PAGE

	// First get the category ID
	const category = await getCategory(categorySlug, locale)
	if (!category) {
		return { posts: [], totalCount: 0 }
	}

	const [posts, totalCount] = await Promise.all([
		fetchSanityLive({
			query: groq`*[_type == $type && $categoryId in categories[]->_id] | order(publishDate desc) [$offset...($offset + $limit)] {
				title,
				publishDate,
				metadata,
				body,
				categories[]->{
					title, 
					slug
				}
			}`,
			params: {
				type,
				categoryId: category._id,
				offset,
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
				categories[]->{title, slug},
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
