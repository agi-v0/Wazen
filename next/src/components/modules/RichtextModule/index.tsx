import {
	PortableText,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import TableOfContents from './TableOfContents'
import AnchoredHeading from './AnchoredHeading'

export default function RichtextModule({
	content,
	tableOfContents,
	headings,
}: Partial<{
	content: any
	tableOfContents: boolean
	headings: {
		style: string
		text: string
	}[]
}>) {
	return (
		<section className="section grid gap-8 md:grid-cols-[1fr_auto]">
			<div className="fluid-gap grid py-(--size--3rem) md:grid-cols-[1fr_auto]">
				{tableOfContents && (
					<aside className="md:sticky-below-header -md:w-[250px] mx-auto w-full max-w-xl self-start rounded-2xl bg-teal-100 p-6 [--offset:1rem] md:order-1">
						<TableOfContents headings={headings} />
					</aside>
				)}

				<div className="mx-auto space-y-6">
					<PortableText
						value={content}
						components={{
							block: {
								h2: (node) => <AnchoredHeading as="h2" {...node} />,
								h3: (node) => <AnchoredHeading as="h3" {...node} />,
							},
							list: {
								// Ex. 1: customizing common list types
								bullet: ({ children }) => (
									<ul className="ms-6 list-disc space-y-4 text-gray-800">
										{children}
									</ul>
								),
								number: ({ children }) => (
									<ol className="ms-6 list-decimal space-y-4 text-gray-800">
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
		</section>
	)
}
