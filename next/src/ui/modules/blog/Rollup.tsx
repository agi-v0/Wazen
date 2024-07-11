import { fetchSanity, groq } from '@/lib/sanity/fetch'
import PostPreview from './PostPreview'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import Link from 'next/link'
import { PiCaretRightBold } from 'react-icons/pi'

export default async function Rollup({
	limit,
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
	const posts = await fetchSanity<Sanity.BlogPost[]>(
		groq`*[_type == 'blog.post' && $categoryRef in categories[]->_id]|order(publishDate desc)[0...$limit]{
		 title,
			publishDate,
			metadata,
			body,
		 categories[]->{
			title
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

	return (
		<section className="section my-12 flex flex-col gap-6">
			{posts[0]?.categories && (
				<div className="flex w-full items-center justify-between">
					<div className="h5 font-semibold">
						{posts[0]?.categories[0]?.title}
					</div>
					<Link href="" className="group px-3 py-1 text-teal-600 no-underline">
						<div className="inline-block">تصفح المزيد</div>
						<PiCaretRightBold className="inline-block size-3 translate-x-0 rotate-180 text-teal-500/50 opacity-0 transition-transform duration-300 group-open:rotate-90 group-hover:-translate-x-[2px] group-hover:opacity-100" />
					</Link>
				</div>
			)}
			<ul
				className={cn(
					'gap-6',
					stegaClean(layout) === 'grid'
						? 'grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'
						: 'carousel max-xl:full-bleed [--size:320px] max-xl:px-4',
				)}
			>
				{posts?.map((post, key) => (
					<li key={key}>
						<PostPreview post={post} locale={locale} />
					</li>
				))}
			</ul>
		</section>
	)
}
