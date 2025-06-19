// import Link from 'next/link'
import { Link } from '@/i18n/routing'
import Date from '@/components/Date'
import { Icon } from '@iconify-icon/react'
import { slugify } from '@/lib/slugify'

export default function PostPreview({
	type,
	post,
	locale,
}: {
	type?: string
	post: Sanity.BlogPost
	locale: any
}) {
	const pageType = type == 'categories-list' ? 'blog' : 'help-center'

	return (
		<Link
			href={`/${pageType}/${post.metadata?.slug?.current}`}
			className="group flex w-full flex-col justify-between rounded-2xl bg-white p-6 group-hover:shadow-lg md:h-full"
		>
			<div className="flex flex-col gap-(--text-large--font-size)">
				{/* Categories */}
				{post?.categories && post.categories.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{post.categories.map((category, index) => (
							<Link
								key={index}
								href={`${pageType}/category/${slugify(
									locale === 'ar' ? category.title.ar : category.title.en,
								)}`}
								className="inline-flex rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-600 transition-colors hover:bg-teal-200"
							>
								{locale === 'ar' ? category.title.ar : category.title.en}
							</Link>
						))}
					</div>
				)}

				<div className="w-fit rounded-full text-sm text-gray-400">
					<Date value={post.publishDate} locale={locale} />
				</div>
				{post.title && (
					<p className="text-large font-semibold text-cyan-950 group-hover:text-teal-600">
						{post.title?.slice(0, 140) +
							(post.title?.length > 140 ? ' ...' : '')}
					</p>
				)}
				<p className="text-base text-cyan-950/60 group-hover:text-cyan-950/80">
					{post.body && post.body[0].children[0].text.slice(0, 140) + ' ...'}
				</p>
			</div>
			<div className="group mt-2 font-medium text-cyan-950/80 transition-all group-hover:text-teal-600">
				{locale == 'en' ? 'Read' : 'قراءة'}
				<Icon
					icon="ph:caret-right-bold"
					className="inline-block translate-x-0 rotate-180 text-xs text-teal-500/50 opacity-0 transition-transform duration-300 group-hover:-translate-x-[2px] group-hover:opacity-100 ltr:rotate-0 ltr:group-hover:translate-x-[2px]"
				/>
			</div>
		</Link>
	)
}
