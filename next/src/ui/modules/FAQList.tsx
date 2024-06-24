import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Link from 'next/link'
import CTA from '../CTA'

export default function FAQList({
	content,
	items,
	sideNote,
}: Partial<{
	content: any
	items: {
		question: string
		answer: any
	}[]
	sideNote: any
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				} else if (value.style === 'h3') {
					return (
						<h3 className="text-large font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h3>
					)
				}
				return (
					<p className="text-main mx-auto max-w-xl text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}
	return (
		<section
			className="section space-y-4 py-12"
			itemScope
			itemType="https://schema.org/FAQPage"
		>
			<header className="richtext text-start">
				<PortableText value={content} components={components} />
			</header>

			<div className="fluid-gap flex flex-col items-start justify-between md:flex-row">
				<div className="w-full lg:w-[70%]">
					{items?.map(({ question, answer }, key) => (
						<details
							className="accordion border-b border-gray-400"
							itemScope
							itemProp="mainEntity"
							itemType="https://schema.org/Question"
							key={key}
						>
							<summary className="text-main py-4 font-semibold" itemProp="name">
								{question}
							</summary>
							<div
								className="anim-fade-to-b pb-4"
								itemScope
								itemProp="acceptedAnswer"
								itemType="https://schema.org/Answer"
							>
								<div
									className="richtext text-small text-gray-600"
									itemProp="text"
								>
									<PortableText value={answer} />
								</div>
							</div>
						</details>
					))}
				</div>

				<div className="flex max-w-sm flex-col items-start gap-6 rounded-lg bg-teal-50 p-4">
					<div className="space-y-4">
						<PortableText value={sideNote.mainTitle} components={components} />
						<PortableText value={sideNote.Subtitle} components={components} />
					</div>

					<CTA
						className="primary text-base font-medium text-teal-50"
						link={sideNote.link}
					/>
				</div>
			</div>
		</section>
	)
}
