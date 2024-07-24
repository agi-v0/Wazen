import Link from 'next/link'
import Date from '@/ui/Date'
import Img from '@/ui/Img'
import Image from 'next/image'
import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { PiCaretRightBold } from 'react-icons/pi'

export default async function FirstPost({
	category,
	categoryRef = category?.length > 0 ? category[0]?._ref : null,
	locale
}: {
	category: any
	categoryRef: any
	locale: any
}) {
	const posts = await fetchSanity<Sanity.BlogPost[]>(
		groq`*[_type == 'blog.post' && (!defined($categoryRef) || $categoryRef in categories[]->_id)] | order(publishDate desc)[0...1] {
			title,
			 publishDate,
			 metadata,
			 body,
			categories[]->{
			 title
			}
		 }`,
		{
			params: { limit: 1, categoryRef },
			tags: ['posts'],
		},
	)

	return (
		<Link
			className="section group block"
			href={`/blog/${posts[0]?.metadata?.slug?.current}`}
		>
			<div className="flex flex-col items-center gap-8 rounded-2xl p-3 shadow-md group-hover:shadow-lg lg:flex-row">
				<div className="flex-1">
					<Image
						src={'/image-placeholder.jpg'}
						alt=""
						width={500}
						height={500}
						className="w-full rounded-md"
					/>
				</div>
				<div className="content flex-1">
					<div className="flex gap-2 text-sm">
						{posts[0]?.categories && (
							<div className="w-fit rounded-full border-2 border-teal-500/20 px-3 py-1 text-teal-600">
								{posts[0]?.categories[0]?.title}
							</div>
						)}
						<div className="w-fit rounded-full bg-teal-500/20 px-3 py-1 text-teal-600">
							<Date value={posts[0].publishDate} locale={locale} />
						</div>
					</div>
					<div className="w-[90%] space-y-4">
						<div className="h4 text-balance font-semibold group-hover:text-cyan-950">
							{posts[0]?.title}
						</div>
						<div className="text-base text-gray-600">
							{posts[0]?.body[0]?.children[0] &&
								posts[0].body[0].children[0].text.slice(0, 320) + ' ...'}
						</div>
						<div className="text-teal-600">
							إقرأ المزيد
							<PiCaretRightBold className="inline-block size-3 translate-x-0 rotate-180 text-teal-500/50 opacity-0 transition-transform duration-300 group-open:rotate-90 group-hover:-translate-x-[2px] group-hover:opacity-100" />
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
