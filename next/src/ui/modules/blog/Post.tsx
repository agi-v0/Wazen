import Date from '@/ui/Date'
import Categories from './CategoriesList'
import ReadTime from './ReadTime'
import {
	PortableText,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import TableOfContents from '@/ui/modules/RichtextModule/TableOfContents'
import AnchoredHeading from '@/ui/modules/RichtextModule/AnchoredHeading'
import Img from '@/ui/Img'
import { PiCircleFill } from 'react-icons/pi'
// import Image from 'next/image'

export default function Post({ post }: { post: Sanity.BlogPost }) {
	return (
		<article className="section fluid-gap flex flex-col">
			<header className="mt-[25vh] md:space-y-12">
				<div className="space-y-6 md:space-y-8">
					<div className="flex items-center justify-center gap-2 text-sm font-medium">
						{post?.categories && (
							<div className="w-fit rounded-full border-2 border-teal-500/20 px-3 py-1 text-teal-600">
								{post?.categories[0]?.title}
							</div>
						)}
						<div className="w-fit rounded-full bg-teal-100 px-3 py-1 text-teal-600">
							<Date value={post.publishDate} />
						</div>
						<ReadTime value={post.readTime} />
					</div>
					<h1 className="h1 text-balance text-center">{post.title}</h1>
				</div>
				<Img
					image={post.metadata.image}
					imageWidth={1200}
					className="aspect-[inherit] w-full rounded-2xl"
				/>
			</header>

			<div className="fluid-gap grid md:grid-cols-[1fr,auto]">
				<aside className="md:sticky-below-header -md:w-[250px] mx-auto w-full max-w-xl self-start rounded-2xl bg-teal-50 p-6 [--offset:1rem] md:order-1">
					<TableOfContents headings={post.headings} />
				</aside>

				<div className="mx-auto space-y-[1.5rem]">
					<PortableText
						value={post.body}
						components={{
							block: {
								h2: (node) => <AnchoredHeading as="h2" {...node} />,
								h3: (node) => <AnchoredHeading as="h3" {...node} />,
							},
							list: {
								// Ex. 1: customizing common list types
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

								// Ex. 2: rendering custom lists
								checkmarks: ({ children }) => (
									<ol className="m-auto text-lg">{children}</ol>
								),
							},
							listItem: {
								// Ex. 1: customizing common list types
								bullet: ({ children }) => (
									<li style={{ listStyleType: 'revert' }}>{children}</li>
								),

								// Ex. 2: rendering custom list items
								checkmarks: ({ children }) => <li>✅ {children}</li>,
							},
							types: {
								// image: Image,
								block: ({ value }: PortableTextTypeComponentProps<any>) => {
									if (value.style === 'h2') {
										return (
											<h2 className="h2 max-w-3xl text-pretty font-semibold leading-tight text-cyan-950">
												{value.children
													.map((child: any) => child.text)
													.join('')}
											</h2>
										)
									} else if (value.style === 'h3') {
										return (
											<h3 className="h3 max-w-3xl text-pretty font-semibold leading-tight text-cyan-950">
												{value.children
													.map((child: any) => child.text)
													.join('')}
											</h3>
										)
									}
									return (
										<p className="text-main text-gray-800">
											{value.children.map((child: any) => child.text).join('')}
										</p>
									)
								},
							},
						}}
					/>
				</div>
			</div>
		</article>
	)
}
