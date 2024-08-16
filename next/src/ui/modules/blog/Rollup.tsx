import { fetchSanity, groq } from '@/lib/sanity/fetch'
import PostPreview from './PostPreview'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import Link from 'next/link'
import { PiCaretRightBold } from 'react-icons/pi'
import { getTranslations } from 'next-intl/server'

export default async function Rollup({
	limit = 3,
	category,
	layout,
	categoryRef = category?.length > 0 ? category[0]?._ref : null,
	locale,
}: Partial<{
	limit?: number
	category: any
	categoryRef: any
	layout: 'grid' | 'carousel'
	locale: string
}>) {
	const t = await getTranslations('Blog')

	const type = locale === 'ar' ? 'blog.post' : 'blog.post.en'

	const posts = await fetchSanity<Sanity.BlogPost[]>(
		groq`*[_type == '${type}' && $categoryRef in categories[]->_id]|order(publishDate desc)[0...$limit]{
		 title,
			publishDate,
			metadata,
			body,
		 categories[]->{
			title,
			title_en
		 }
		}`,
		{
			params: {
				limit,
				categoryRef,
			},
			tags: ['posts'],
		},
	)

	const categoryTitle: any =
		locale == 'ar'
			? posts[0]?.categories[0]?.title
			: posts[0]?.categories[0]?.title_en
	if (posts[0])
		return (
			<section className="bg-teal-50" id={stegaClean(categoryTitle)}>
				<div className="section fluid-gap flex flex-col items-center bg-teal-50 py-[var(--size--4rem)]">
					{posts[0]?.categories && (
						<h2 className="h3 text-center font-semibold text-cyan-950">
							{categoryTitle}
						</h2>
					)}
					<ul
						className={cn(
							'w-full gap-6',
							stegaClean(layout) === 'grid'
								? 'grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'
								: 'grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
						)}
					>
						{posts?.map((post, key) => (
							<li key={key}>
								<PostPreview post={post} locale={locale} />
							</li>
						))}
					</ul>
					<Link
						href="/"
						className="group flex flex-row items-center justify-center rounded-lg px-6 py-3 font-medium text-cyan-950/80 no-underline hover:bg-white/80 hover:text-cyan-950"
					>
						{t('Read more')}
						<PiCaretRightBold className="size- translate-x-0 text-cyan-950/60 opacity-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
					</Link>
				</div>
			</section>
		)
}
