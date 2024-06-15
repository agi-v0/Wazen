import Link from 'next/link'
import Date from '@/ui/Date'
import Image from 'next/image'

export default function PostPreview({ post }: { post: Sanity.BlogPost }) {
	return (
		<Link
			className="group block"
			href={`/blog/${post.metadata?.slug?.current}`}
		>
			<div className="rounded-md p-2 shadow-md">
				<Image
					src={post?.metadata?.image || '/image-placeholder.jpg'}
					alt=""
					width={300}
					height={300}
					className="w-full"
				/>
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
