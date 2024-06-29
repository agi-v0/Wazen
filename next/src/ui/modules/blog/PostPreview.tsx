import Link from 'next/link'
import Date from '@/ui/Date'
import Image from 'next/image'
// import Image from '../RichtextModule/Image'
import Img from '@/ui/Img'
import { PiCaretRightBold } from 'react-icons/pi'

export default function PostPreview({ post }: { post: Sanity.BlogPost }) {
	return (
		<Link
			href={`/blog/${post.metadata?.slug?.current}`}
			className="group w-full md:h-full"
		>
			<div className="flex flex-col gap-3 rounded-lg bg-white">
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
				<div className="flex flex-col gap-3 p-3">
					<div className="flex gap-2 text-sm font-medium">
						{post?.categories && (
							<div className="w-fit rounded-full border-2 border-teal-500/20 px-3 py-1 text-teal-600">
								{post?.categories[0]?.title}
							</div>
						)}
						<div className="w-fit rounded-full bg-teal-100 px-3 py-1 text-teal-600">
							<Date value={post.publishDate} />
						</div>
					</div>
					<div className="text-large font-semibold text-gray-600 group-hover:text-cyan-950">
						{post.title.slice(0, 64) + (post.title.length > 100 ? ' ...' : '')}
					</div>
					<div className="text-base text-gray-600">
						{post.body[0]?.children[0] &&
							post.body[0].children[0].text.slice(0, 160) + ' ...'}
					</div>
					<div className="group text-teal-600">
						إقرأ المزيد
						<PiCaretRightBold className="inline-block size-3 translate-x-0 rotate-180 text-teal-500/50 opacity-0 transition-transform duration-300 group-open:rotate-90 group-hover:-translate-x-[2px] group-hover:opacity-100" />
					</div>
				</div>
			</div>
		</Link>
	)
}
