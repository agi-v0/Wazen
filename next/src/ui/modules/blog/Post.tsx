import Date from '@/ui/Date'
import Categories from './CategoriesList'
import ReadTime from './ReadTime'
import { PortableText } from '@portabletext/react'
import TableOfContents from '@/ui/modules/RichtextModule/TableOfContents'
import AnchoredHeading from '@/ui/modules/RichtextModule/AnchoredHeading'
import Img from '@/ui/Img'
// import Image from 'next/image'

export default function Post({ post }: { post: Sanity.BlogPost }) {
	return (
		<article className="section">
			<header className="my-[var(--header-height)] space-y-6 md:space-y-8">
				<Img
					image={post.metadata.image}
					imageWidth={1200}
					className="aspect-[inherit] w-full rounded-md object-cover"
				/>
				<div className="flex justify-center gap-2 text-sm font-medium">
					{post?.categories && (
						<div className="w-fit rounded-full border-2 border-teal-500/20 px-3 py-1 text-teal-600">
							{post?.categories[0]?.title}
						</div>
					)}
					<div className="w-fit rounded-full bg-teal-100 px-3 py-1 text-teal-600">
						<Date value={post.publishDate} />
					</div>
					<div className="flex flex-wrap items-center justify-between gap-x-4">
						<ReadTime value={post.readTime} />
					</div>
				</div>
				<h1 className="h1 text-balance text-center">{post.title}</h1>
			</header>

			<div className="grid gap-8 md:grid-cols-[1fr,auto]">
				<aside className="md:sticky-below-header -md:w-[250px] mx-auto w-full max-w-xl self-start rounded-lg bg-teal-50 p-6 [--offset:1rem] md:order-1">
					<TableOfContents headings={post.headings} />
				</aside>

				<div className="richtext mx-auto [&>:not(:first-of-type)]:!mt-[1em]">
					<PortableText
						value={post.body}
						components={{
							block: {
								h2: (node) => <AnchoredHeading as="h2" {...node} />,
								h3: (node) => <AnchoredHeading as="h3" {...node} />,
							},
							// types: {
							// 	image: Image,
							// },
						}}
					/>
				</div>
			</div>
		</article>
	)
}
