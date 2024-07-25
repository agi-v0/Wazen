import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
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
		<section id="FAQ" className="section space-y-4 py-12">
			<header className="richtext text-start">
				<PortableText value={content} components={components} />
			</header>

			<div className="fluid-gap flex flex-col items-start justify-between md:flex-row">
				<div className="w-full lg:w-[70%]">
					{items?.map(({ question, answer }, key) => (
						<Accordion type="single" collapsible>
							<AccordionItem value={`item-${key}`}>
								<AccordionTrigger className="text-gray-950 no-underline">
									{question}
								</AccordionTrigger>
								<AccordionContent>
									<PortableText value={answer} />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>

				<div className="flex max-w-sm flex-col items-start gap-4 rounded-lg bg-teal-50 p-[var(--text-large--font-size)] lg:min-w-[400px]">
					<div className="space-y-4">
						<h3 className="text-large font-semibold leading-tight text-cyan-950">
							{sideNote.title}
						</h3>
						<p className="text-main text-cyan-950/80">{sideNote.subtitle}</p>
					</div>
					<CTA
						className="secondary text-small font-medium"
						link={sideNote.link}
					/>
				</div>
			</div>
		</section>
	)
}
