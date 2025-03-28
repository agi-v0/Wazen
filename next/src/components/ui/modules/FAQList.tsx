'use client'
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
import Button from '../LinkButton'
import { PiCaretLeftBold } from '@/components/ui/Icons'

export default function FAQList({
	locale = 'ar',
	content,
	items,
	sideNote,
}: Partial<{
	locale: 'en' | 'ar'
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
			<PortableText value={content} components={components} />

			<div className="fluid-gap flex flex-col items-start justify-between lg:flex-row">
				<div className="w-full lg:w-[70%]">
					<Accordion type="single" collapsible>
						{items?.map(({ question, answer }, idx) => (
							<AccordionItem value={`item-${idx}`} key={question}>
								<AccordionTrigger className="text-main text-start text-gray-950 no-underline">
									{question}
								</AccordionTrigger>
								<AccordionContent>
									<PortableText value={answer} components={components} />
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>

				<div className="flex w-full flex-col items-start gap-4 rounded-lg bg-teal-50 p-[var(--text-large--font-size)] lg:max-w-[30%]">
					<h3 className="text-large font-semibold leading-tight text-teal-950">
						{sideNote.title}
					</h3>
					<p className="text-main text-teal-900">{sideNote.subtitle}</p>
					<span className="text-main group flex items-center rounded-full p-2 px-4 font-medium text-teal-600">
						<Button
							locale={locale}
							link={sideNote.link}
							className="no-underline"
						>
							{sideNote.link.label}
						</Button>
						<PiCaretLeftBold className="ms-1 size-3 translate-x-0 text-teal-500/50 transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-teal-600 ltr:rotate-180 ltr:group-hover:translate-x-1" />
					</span>
				</div>
			</div>
		</section>
	)
}
