'use client'

import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { stegaClean } from '@sanity/client/stega'
import { InfiniteMovingCards } from '@/components/animated/infinite-moving-cards'
import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import { PiCaretRightBold } from 'react-icons/pi'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'
import EmblaCarousel from '@/components/ui/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'

export default function Applications({
	pretitle,
	content,
	links,
	locale,
	ctas,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	links: any
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
	const SLIDES = Array.from(Array(5).keys())
	return (
		<section
			className={
				'fluid-vertical-space grid min-h-screen *:col-span-full *:row-span-full'
			}
		>
			<div
				className={
					'flex w-full flex-col items-center justify-evenly overflow-hidden'
				}
			>
				<div
					className={'flex flex-col items-center gap-6'}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<Pretitle className={'text-large font-semibold text-gray-400'}>
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={components} />
				</div>
				<div className="py-12" dir={direction}>
					{/* <InfiniteMovingCards
						direction={'right'}
						speed={'slow'}
						pauseOnHover={true}
						items={links}
					/> */}
					<EmblaCarousel slides={links} options={OPTIONS} locale={locale} />
				</div>
			</div>
		</section>
	)
}
