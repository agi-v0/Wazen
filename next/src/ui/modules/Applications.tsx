'use client'
import dynamic from 'next/dynamic'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { stegaClean } from '@sanity/client/stega'
import { EmblaOptionsType } from 'embla-carousel'
import { InfiniteMovingCards } from '@/components/animated/infinite-moving-cards'

const EmblaCarousel = dynamic(
	() => import('@/components/EmblaCarousel/EmblaCarousel'),
)

export default function Applications({
	pretitle,
	content,
	cards,
	locale,
	ctas,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	cards: any
	locale: string
	ctas: any
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
				}
				return (
					<p className="text-main mx-auto max-w-xl text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	const direction = locale === 'en' ? 'ltr' : 'rtl'
	const OPTIONS: EmblaOptionsType = { direction: direction, loop: true }
	return (
		<section
			className={
				'fluid-vertical-space fluid-gap flex min-h-screen w-full flex-col items-center justify-evenly overflow-hidden'
			}
		>
			<div
				className={'flex flex-col items-center gap-6'}
				style={{ textAlign: stegaClean(textAlign) }}
			>
				<Pretitle className="text-large font-semibold text-gray-400">
					{pretitle}
				</Pretitle>
				<PortableText value={content} components={components} />
			</div>
			<div className="" dir={direction}>
				{/* <EmblaCarousel slides={cards} options={OPTIONS} locale={locale} /> */}
				<InfiniteMovingCards
					direction={'right'}
					speed={'slow'}
					pauseOnHover={true}
					items={cards}
				/>
			</div>
		</section>
	)
}
