// import Link from 'next/link'
import { Link } from '@/i18n/navigations'
import Date from '@/ui/Date'
import Image from 'next/image'
import { PiCaretRightBold } from 'react-icons/pi'
import { useTranslations } from 'next-intl'

export default function PostPreview({
	type,
	post,
	locale,
}: {
	type?: string
	post: Sanity.BlogPost
	locale: any
}) {
	// const categoryTitle: any =
	// 	locale == 'ar' ? post?.categories[0]?.title : post?.categories[0]?.title_en

	const t = useTranslations('Blog')
	const pageType = type == 'categories-list' ? 'blog' : 'help-center'

	return (
		<Link
			href={`/${pageType}/${post.metadata?.slug?.current}`}
			className="group w-full md:h-full"
		>
			<div className="flex flex-col gap-[var(--text-large--font-size)] rounded-2xl bg-white p-6 group-hover:shadow-lg">
				{/* {post.metadata.image ? (
					<Img
						image={post.metadata.image}
						imageWidth={800}
						className="w-full rounded-md"
					/>
				) : (
					<Image
						src="/image-placeholder.jpg"
						alt=""
						width={600}
						height={190}
						className="h-[190px] rounded-md object-cover"
					/>
				)} */}
				{/* <div className="flex items-center gap-2 text-sm font-medium">
					{post?.categories && (
						<div className="w-fit rounded-full border-2 border-teal-500/20 px-3 py-1 text-teal-600">
							{categoryTitle}
						</div>
					)}
				</div> */}
				<div className="w-fit rounded-full text-sm text-gray-400">
					<Date value={post.publishDate} locale={locale} />
				</div>
				<p className="text-large font-semibold text-cyan-950 group-hover:text-teal-600">
					{post.title.slice(0, 64) + (post.title.length > 100 ? ' ...' : '')}
				</p>
				<p className="text-base text-cyan-950/60 group-hover:text-cyan-950/80">
					{post.body && post.body[0].children[0].text.slice(0, 160) + ' ...'}
				</p>
				<div className="group font-medium text-cyan-950/80 transition-all group-hover:text-teal-600">
					{t('Read more')}
					<PiCaretRightBold className="inline-block size-3 translate-x-0 rotate-180 text-teal-500/50 opacity-0 transition-transform duration-300 group-hover:-translate-x-[2px] group-hover:opacity-100 ltr:rotate-0 ltr:group-hover:translate-x-[2px]" />
				</div>
			</div>
		</Link>
	)
}
