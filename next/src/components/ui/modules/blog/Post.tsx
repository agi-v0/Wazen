import Date from '@/components/ui/Date'
import ReadTime from './ReadTime'
import {
	PortableText,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import TableOfContents from '@/components/ui/modules/RichtextModule/TableOfContents'
import AnchoredHeading from '@/components/ui/modules/RichtextModule/AnchoredHeading'
import { Img } from '@/components/ui/Img'
import { Icon } from '@iconify-icon/react'
// import Image from 'next/image'

export default function Post({
	post,
	locale,
}: {
	post: Sanity.BlogPost
	locale: any
}) {
	return (
		<article className="section">
			<header className="mt-[25vh] md:space-y-12">
				<div className="space-y-6 md:space-y-8">
					<div className="flex items-center justify-center gap-2 text-sm font-medium">
						{post?.categories && (
							<div className="w-fit rounded-full bg-teal-100 px-3 py-1 text-teal-600">
								{locale == 'ar'
									? post?.categories[0]?.title
									: post?.categories[0]?.title_en}
							</div>
						)}
						<div className="flex w-fit flex-row items-center gap-1 rounded-full px-3 py-1 text-cyan-950/60">
							<Icon icon="ph:calendar-blank-line" className="size-4" />
							<Date value={post.publishDate} locale={locale} />
						</div>
						<ReadTime value={post.readTime} />
					</div>
					<h1 className="h1 mx-auto max-w-5xl text-balance text-center text-cyan-950">
						{post.title}
					</h1>
				</div>
				<Img
					image={post.metadata.image}
					//
					className="aspect-[inherit] w-full rounded-2xl"
					priority
				/>
			</header>

			<div className="fluid-gap grid py-[var(--size--3rem)] md:grid-cols-3">
				<aside className="md:sticky-below-header mx-auto w-full self-start rounded-2xl bg-teal-100 p-6 [--offset:1rem] md:order-1">
					<TableOfContents headings={post.headings} />
				</aside>

				<div className="mx-auto space-y-[1.5rem] md:col-span-2">
					<PortableText
						value={post.body}
						components={{
							block: {
								normal: ({ children }) => (
									<p className="text-main text-gray-600">{children}</p>
								),
								h2: (props) => <AnchoredHeading as="h2" {...props} />,
								h3: (props) => <AnchoredHeading as="h3" {...props} />,
							},
							list: {
								bullet: ({ children }) => (
									<ul className="ms-[1.5rem] list-disc space-y-4 text-gray-800">
										{children}
									</ul>
								),
								number: ({ children }) => (
									<ol className="ms-[1.5rem] list-decimal space-y-4 text-gray-800">
										{children}
									</ol>
								),
								checkmarks: ({ children }) => (
									<ol className="m-auto text-lg">{children}</ol>
								),
							},
							listItem: {
								bullet: ({ children }) => (
									<li style={{ listStyleType: 'revert' }}>{children}</li>
								),
								checkmarks: ({ children }) => <li>✅ {children}</li>,
							},
						}}
					/>
				</div>
			</div>
		</article>
	)
}
