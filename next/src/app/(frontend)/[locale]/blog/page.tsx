import { fetchSanity, fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { creativeModuleQuery } from '@/sanity/lib/queries'
import Modules from '@/components/modules'
import processMetadata from '@/lib/processMetadata'
import { setRequestLocale } from 'next-intl/server'
import BlogList from '@/components/modules/blog/BlogList'

type Props = {
	params: Promise<{ locale: 'en' | 'ar' }>
}

export default async function Page({ params }: Props) {
	const resolvedParams = await params
	setRequestLocale(resolvedParams.locale)

	const [page, blogData] = await Promise.all([
		getPage(resolvedParams.locale),
		getBlogPosts(resolvedParams.locale),
	])

	return (
		<>
			<Modules modules={page?.modules} locale={resolvedParams.locale} />
			<BlogList
				locale={resolvedParams.locale}
				initialPosts={blogData.posts}
				totalCount={blogData.totalCount}
			/>
		</>
	)
}

export async function generateMetadata({ params }: Props) {
	const resolvedParams = await params

	const page = await getPage(resolvedParams.locale)
	return processMetadata(page, resolvedParams.locale)
}

async function getBlogPosts(locale: 'en' | 'ar') {
	const type = locale === 'en' ? 'blog.post.en' : 'blog.post'
	const POSTS_PER_PAGE = 9

	const [posts, totalCount] = await Promise.all([
		fetchSanityLive({
			query: groq`*[_type == $type] | order(publishDate desc) [0...$limit] {
				title,
				publishDate,
				metadata,
				body,
				categories[]->{
					title
				}
			}`,
			params: { type, limit: POSTS_PER_PAGE },
			tags: ['blog'],
		}),
		fetchSanityLive({
			query: groq`count(*[_type == $type])`,
			params: { type },
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
