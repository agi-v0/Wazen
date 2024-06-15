import Link from 'next/link'
import Date from '@/ui/Date'
import Img from '@/ui/Img'
import Image from 'next/image'
import { fetchSanity, groq } from '@/lib/sanity/fetch'

export default async function FirstPost({
	category,
	categoryRef = category?.length > 0 ? category[0]?._ref : null,
}: {
	category: any
	categoryRef: any
}) {
	const posts = await fetchSanity<Sanity.BlogPost[]>(
		groq`*[_type == 'blog.post' && $categoryRef in categories[]->_id][0...1] | order(publishDate desc){
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
			className="group m-8 block"
			href={`/blog/${posts[0]?.metadata?.slug?.current}`}
		>
			<div className="rounded-md p-3 shadow-md">
				<div className="flex flex-col items-center gap-8 lg:flex-row">
					<figure>
						<Image
							src={'/image-placeholder.jpg'}
							alt=""
							width={500}
							height={500}
							className="rounded-md"
						/>
					</figure>
					<div className="content">
						<div className="my-2 w-fit rounded-full border border-[#0D9488] bg-[#0D9488]/20 px-6 py-1 text-[#0D9488]">
							<Date value={posts[0]?.publishDate} />
						</div>
						{posts[0]?.categories && (
							<div className="my-2 w-fit rounded-full border border-[#0D9488] bg-[#0D9488]/20 px-6 py-1 text-[#0D9488]">
								{posts[0]?.categories[0]?.title}
							</div>
						)}
						<div className="w-[90%]">
							<div className="my-4 text-2xl group-hover:underline">
								{posts[0]?.title}
							</div>
							<div className="text-md my-4">
								{posts[0]?.body[0]?.children[0] &&
									posts[0].body[0].children[0].text.slice(0, 200) + '...'}
							</div>
						</div>
						<div className="text-[#0D9488]">إقرأ المزيد</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
