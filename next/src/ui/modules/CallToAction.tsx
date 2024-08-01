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
					<div className="flex items-center gap-2">
						<PiCheckCircle className="h-4 w-4 text-gray-400" />
						<p className="text-small text-gray-400">{textContent}</p>
					</div>
				)
			},
		},
	}

	return (
		<section className={'section fluid-vertical-space'}>
			<div
				className={
					'fluid-gap fluid-padding relative flex w-full flex-col-reverse items-center justify-evenly overflow-hidden rounded-2xl lg:flex-row'
				}
			>
				<div
					className={'flex max-w-2xl flex-col items-start gap-8'}
					// style={{ textAlign: stegaClean(textAlign) }}
				>
					<PortableText value={content} components={components} />

					<CTAList ctas={ctas} className="w-full" />
					<div className="flex flex-col gap-2">
						<PortableText
							value={checkedList}
							components={checkedListComponents}
						/>
					</div>
				</div>
				<div className="h-[400px] w-full lg:max-w-[400px]">
					<div className="brief-background relative h-full overflow-hidden rounded-sm border-8 border-white shadow-md">
						<div
							className={cn(
								image?.onRight ? 'left-8' : 'right-8',
								'absolute top-8 h-full w-full min-w-[800px]',
							)}
						>
							<Img
								image={image}
								imageWidth={640}
								className="relative h-auto w-full overflow-hidden rounded-2xl border-8 border-white object-cover shadow-md lg:max-w-[450px]"
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
			</div>
		</section>
	)
}
