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
		<article className="mt-14">
			<header className="section space-y-4">
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
				<h1 className="h1 text-6xl">{post.title}</h1>
				<div className="my-4">
					<Img
						image={post.metadata.image}
						imageWidth={1200}
						className="aspect-[inherit] w-full rounded-md object-cover"
					/>
				</div>
				<div className="flex flex-wrap items-center justify-between gap-x-4">
					<ReadTime value={post.readTime} />
				</div>
			</header>

			<div className="section grid gap-8 md:grid-cols-[1fr,auto]">
				<aside className="md:sticky-below-header mx-auto w-full max-w-xl self-start bg-teal-50 p-4 [--offset:1rem] md:order-1 md:w-[250px]">
					<TableOfContents headings={post.headings} />
				</aside>

				<div className="richtext mx-auto max-w-screen-sm [&>:not(:first-of-type)]:!mt-[1em]">
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
