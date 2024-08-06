import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import blob from '../../../public/gradient-blob.svg'
import { PiCaretRightBold, PiCheckCircle } from 'react-icons/pi'
import Button from '../Button'

// https://magicui.design/docs/components/neon-gradient-card

export default function CallToActionTwo({
	content,
	ctas,
	image,
	checkedList,
	textAlign = 'start',
	alignItems,
}: Partial<{
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image & { onRight?: boolean }
	checkedList: any
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
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
						<p className="text-large font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</p>
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
	const checkedListComponents: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				const textContent = value.children
					.map((child: any) => child.text)
					.join('')
				if (!textContent.trim()) return null // Do not render if text content is empty or just whitespace

				return (
					<div className="flex items-center gap-2 text-cyan-950/60">
						<PiCheckCircle className="h-4 w-4" />
						<p className="text-small">{textContent}</p>
					</div>
				)
			},
		},
	}

	return (
		<section className="fluid-vertical-space fluid-gap flex flex-col items-center justify-center bg-teal-100">
			<div className="section flex flex-col items-center gap-6 text-center">
				<PortableText value={content} components={components} />
			</div>

			{ctas && (
				<Button
					link={ctas[0].link}
					className="h2 mx-4 flex h-[var(--size--8rem)] items-center justify-center gap-[var(--size--2rem)] rounded-3xl bg-cyan-950 px-[var(--size--4rem)] font-semibold leading-tight text-white hover:bg-cyan-950/90 max-md:gap-2 max-md:rounded-2xl max-md:px-4"
				>
					{ctas[0].link?.label}
					<PiCaretRightBold className="h2 text-white rtl:rotate-180" />
				</Button>
			)}
			<div className="section flex flex-row items-center justify-center gap-2">
				<PortableText value={checkedList} components={checkedListComponents} />
			</div>
		</section>
	)
}
