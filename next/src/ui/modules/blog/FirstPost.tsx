import Link from 'next/link'
import Date from '@/ui/Date'
import Img from '@/ui/Img'
import processUrl from '@/lib/processUrl'

// export default function FirstPost({ post }: { post: Sanity.BlogPost }) {
export default function FirstPost() {
	return (
		// <Link className="group block" href={processUrl(post, { base: false })}>
		<div className="rounded-md p-2 shadow-md">
			<div className="flex flex-row items-center gap-4">
				<figure className="aspect-video bg-ink/5">
					{/* <Img
						className="aspect-[inherit] w-full object-cover"
						image={post.metadata.image}
						imageWidth={600}
					/> */}
				</figure>
				<div className="content">
					<div className="my-2 w-fit rounded-full border border-[#0D9488] bg-[#0D9488]/20 px-6 py-1 text-[#0D9488]">
						{/* <Date value={post.publishDate} /> */}
						20-04-2024
					</div>
					<div className="w-[90%]">
						{/* <div className="h3 group-hover:underline">{post.title}</div> */}
						<div className="h3 group-hover:underline">Title Here</div>
						<div className="h3 group-hover:underline">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Suspendisse varius enim in eros.
						</div>
					</div>
					<div className="text-[#0D9488]">إقرأ المزيد</div>
				</div>
			</div>
		</div>
		// </Link>
	)
}
