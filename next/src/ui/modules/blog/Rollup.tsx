import { fetchSanity, groq } from '@/lib/sanity/fetch'
import PostPreview from './PostPreview'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'

export default async function Rollup({
	limit,
	category,
	layout,
	categoryRef = category?.length > 0 ? category[0]?._ref : null,
}: Partial<{
	limit?: number
	category: any
	categoryRef: any
	layout: 'grid' | 'carousel'
}>) {
	const posts = await fetchSanity<Sanity.BlogPost[]>(
		groq`*[_type == 'blog.post' && $categoryRef in categories[]->_id]|order(publishDate desc)[0...$limit]{
		 title,
			publishDate,
			metadata,
			body,
		 categories[]->{
			title
		 }
		}`,
		{
			params: {
				limit,
				categoryRef,
			},
			tags: ['posts'],
		},
	)

	return (
		<section className="section my-20 space-y-4">
			{posts[0]?.categories && (
				<div className="text-4xl font-bold">
					{posts[0]?.categories[0]?.title}
				</div>
			)}
			<ul
				className={cn(
					'gap-6',
					stegaClean(layout) === 'grid'
						? 'grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'
						: 'carousel max-xl:full-bleed [--size:320px] max-xl:px-4',
				)}
			>
				{posts?.map((post, key) => (
					<li key={key}>
						<PostPreview post={post} />
					</li>
				))}
			</ul>
		</section>
	)
}
