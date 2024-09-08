import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import Image from 'next/image'
import blob from '../../../public/gradient-blob.svg'
import { PiCheckCircle } from 'react-icons/pi'

// https://magicui.design/docs/components/neon-gradient-card

export default function CallToAction({
	content,
	ctas,
	image,
	checkedList,
	textAlign = 'start',
	alignItems,
	callToActionDoc,
}: Partial<{
	content: any
	ctas: Sanity.CTA[]
	checkedList: any
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
	image: Sanity.Image & { onRight?: boolean }
	callToActionDoc: {
		content: any
		ctas: Sanity.CTA[]
		checkedList: any
		image: Sanity.Image & { onRight?: boolean }
	}[]
}>) {
	const callToActionContent = content ?? callToActionDoc?.[0].content
	const callToActionCTAs = ctas ?? callToActionDoc?.[0].ctas
	const callToActionCheckedList =
		checkedList ?? callToActionDoc?.[0].checkedList
	const callToActionImage =
		image && 'asset' in image ? image : callToActionDoc?.[0].image
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
					<div className="flex items-center gap-2">
						<PiCheckCircle className="h-4 w-4 text-gray-400" />
						<p className="text-small text-gray-400">{textContent}</p>
					</div>
				)
			},
		},
	}

	return (
		<section className="section fluid-vertical-space fluid-gap fluid-padding relative flex w-full flex-col-reverse items-center justify-evenly overflow-hidden rounded-2xl lg:flex-row">
			<div
				className="flex max-w-2xl flex-col items-start gap-8"
				// style={{ textAlign: stegaClean(textAlign) }}
			>
				<PortableText value={callToActionContent} components={components} />

				<CTAList
					ctas={callToActionCTAs}
					className="w-full *:h-12 *:text-base"
				/>
				<div className="flex flex-col gap-2">
					<PortableText
						value={callToActionCheckedList}
						components={checkedListComponents}
					/>
				</div>
			</div>
			<div className="h-[400px] w-full lg:max-w-[400px]">
				<div className="brief-background relative h-full overflow-hidden rounded-2xl border-8 border-white">
					<div
						className={cn(
							callToActionImage?.onRight ? 'left-8' : 'right-8',
							'absolute top-8 h-full w-full min-w-[800px]',
						)}
					>
						<Img
							image={callToActionImage}
							imageWidth={640}
							className="relative h-auto w-full overflow-hidden rounded-2xl border-8 border-white object-cover lg:max-w-[450px]"
						/>
					</div>
				</div>
			</div>
			<Image
				src={blob}
				alt="hero"
				className="pointer-events-none absolute right-0 top-0 z-[-1] h-full w-auto object-cover"
				draggable={false}
			/>
		</section>
	)
}
