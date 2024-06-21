import Link from 'next/link'
import Date from '@/ui/Date'
import Image from 'next/image'
// import Image from '../RichtextModule/Image'
import Img from '@/ui/Img'

export default function PostPreview({ post }: { post: Sanity.BlogPost }) {
	return (
		<Link
			className="group block"
			href={`/blog/${post.metadata?.slug?.current}`}
		>
			<div className="w-full rounded-md object-cover p-2 shadow-md">
				{post.metadata.image ? (
					<Img
						image={post.metadata.image}
						imageWidth={600}
						className="w-full"
					/>
				) : (
						<Image
							src="/image-placeholder.jpg"
							alt=""
							width={600}
							height={190}
							className='h-[190px] object-cover'
						/>
				)}
				<div className="flex gap-4">
					{post?.categories && (
						<div className="my-2 w-fit rounded-full border border-[#0D9488] bg-[#0D9488]/20 px-6 py-1 text-[#0D9488]">
							{post?.categories[0]?.title}
						</div>
					)}
					<div className="my-2 w-fit rounded-full border border-[#0D9488] bg-[#0D9488]/20 px-6 py-1 text-[#0D9488]">
						<Date value={post.publishDate} />
					</div>
				</div>
				<div className="w-[90%]">
					<div className="my-4 text-2xl group-hover:underline">
						{post.title}
					</div>
					<div className="text-md my-4">
						{post?.body[0]?.children[0] &&
							post.body[0].children[0].text.slice(0, 150) + '...'}
					</div>
				</div>
				<div className="text-[#0D9488]">إقرأ المزيد</div>
			</div>
		</Link>
	)
}
