import Link from 'next/link'
import Date from '@/ui/Date'
import Image from 'next/image'
// import Image from '../RichtextModule/Image'
import Img from '@/ui/Img'

export default function PostPreview({ post }: { post: Sanity.BlogPost }) {
	return (
		<Link
			href={`/blog/${post.metadata?.slug?.current}`}
		>
			<div className="w-full rounded-2xl p-2 shadow-md md:min-h-[450px]">
				{post.metadata.image ? (
					<Img
						image={post.metadata.image}
						imageWidth={600}
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
				)}
				<div className='flex flex-col space-between h-full'>
					<div className="flex gap-2">
						{post?.categories && (
							<div className="my-2 w-fit rounded-full border-2 border-[#0D9488]/20 p-2 text-sm text-[#0D9488]">
								{post?.categories[0]?.title}
							</div>
						)}
						<div className="my-2 w-fit rounded-full bg-[#0D9488]/20 p-2 text-[#0D9488]">
							<Date value={post.publishDate} />
						</div>
					</div>
					<div className="my-4 text-2xl group-hover:underline">
						{post.title}
					</div>
					<div className="text-[#0D9488]">إقرأ المزيد</div>
				</div>
			</div>
		</Link>
	)
}
