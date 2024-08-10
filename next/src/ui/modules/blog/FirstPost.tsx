import Link from 'next/link'
import Date from '@/ui/Date'
import Img from '@/ui/Img'
import Image from 'next/image'
import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { PiCaretRightBold } from 'react-icons/pi'

export default async function FirstPost({
	category,
	categoryRef = category?.length > 0 ? category[0]?._ref : null,
	locale,
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
			href={`/${locale}/blog/${posts[0].metadata?.slug?.current}`}
		>
			<div className="relative flex flex-col items-center gap-8 rounded-2xl p-6 shadow-md group-hover:shadow-lg lg:flex-row lg:items-stretch">
				{/* <Image
					src={'/image-placeholder.jpg'}
					alt=""
					width={500}
					height={500}
					className="w-full flex-1 rounded-md"
				/> */}
				<div className="relative h-auto w-full flex-1 grow overflow-hidden rounded-md">
					<Img
						image={posts[0].metadata.image}
						imageWidth={1200}
						className="absolute right-0 top-0 h-[420px] w-auto object-cover"
					/>
				</div>
				<div className="content flex-1 space-y-6 py-4">
					<span className="w-fit text-gray-400">
						<Date value={posts[0].publishDate} locale={locale} />
					</span>
					<p className="h2 font-semibold text-cyan-950 group-hover:text-cyan-900">
						{posts[0].title.slice(0, 64) +
							(posts[0].title.length > 64 ? '' : '')}
					</p>
					{posts[0]?.categories && (
						<div className="w-fit rounded-full border-2 border-teal-500/20 px-3 py-1 text-teal-600">
							{posts[0]?.categories[0]?.title}
						</div>
					)}
					<p className="text-base text-gray-600">
						{posts[0]?.body[0]?.children[0] &&
							posts[0].body[0].children[0].text.slice(0, 240) + ' ...'}
					</p>
					<div className="font-medium text-teal-600">
						إقرأ المزيد
						<PiCaretRightBold className="inline-block size-3 translate-x-0 rotate-180 text-teal-500/50 opacity-0 transition-transform duration-300 group-open:rotate-90 group-hover:-translate-x-1 group-hover:opacity-100" />
					</div>
				</div>
			</div>
		</Link>
	)
}
