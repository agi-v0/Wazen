import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { PortableText } from '@portabletext/react'
import PostPreview from './PostPreview'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import FirstPost from './FirstPost'

export default async function Rollup({
	limit,
	category,
	layout,
}: Partial<{
	limit?: number
	category: any
	layout: 'grid' | 'carousel'
}>) {
	const posts = await fetchSanity<Sanity.BlogPost[]>(
		groq`*[_type == 'blog.post' && $categoryRef in categories[]->_id][0...$limit]|order(publishDate desc){
		 title,
			publishDate,
			metadata,
			body,
		 categories[]->{
			title
		 }
		}`,
		{
			params: { limit, categoryRef: category[0]._ref },
			tags: ['posts'],
		},
	)

	return (
		<section className="section space-y-4">
			<div className="text-4xl font-bold">{posts[0]?.categories[0].title}</div>
			<ul
				className={cn(
					'gap-6',
					stegaClean(layout) === 'grid'
						? 'grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'
						: 'carousel max-xl:full-bleed [--size:320px] max-xl:px-4',
				)}
			>
				{posts?.map((post, key) => (
					<li key={key} className="">
						<PostPreview post={post} />
					</li>
				))}
			</ul>
		</section>
	)
}
