'use client'

import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { stegaClean } from '@sanity/client/stega'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import { PiCaretRightBold } from 'react-icons/pi'

export default function Applications({
	pretitle,
	mainTitle,
	Subtitle,
	link,
	links,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	mainTitle: any
	Subtitle: any
	link: any
	links: any
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h3') {
					return (
						<h3 className="text-4xl font-semibold leading-tight lg:text-5xl">
							{value.children.map((child: any) => child.text).join('')}
						</h3>
					)
				}
				return (
					<p className="mx-auto max-w-xl text-base font-light md:max-w-3xl md:text-lg">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section className={'grid *:col-span-full *:row-span-full'}>
			<div
				className={
					'flex w-full flex-col items-center justify-evenly gap-10 gap-y-6 overflow-hidden p-10 '
				}
			>
				<div
					className={'flex flex-col items-center gap-8'}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<Pretitle className={'py-1 text-4xl text-gray-400'}>
						{pretitle}
					</Pretitle>
					<PortableText value={mainTitle} components={components} />
					<PortableText value={Subtitle} components={components} />
					<Link
						href={processUrl(link.internal, {
							base: false,
							params: link.params,
						})}
						className="w-fit"
					>
						<summary className="link flex items-center gap-1 px-3 text-teal-600 no-underline">
							{link.label}
							<PiCaretRightBold className="size-3 rotate-180 text-teal-600" />
						</summary>
					</Link>
					<div className="bg-teal-50/40 py-10">
						<InfiniteMovingCards
							direction={'left'}
							speed={'slow'}
							pauseOnHover={true}
							links= {links}
							logoType = 'default'
						/>
						<InfiniteMovingCards
							direction={'right'}
							speed={'slow'}
							pauseOnHover={true}
							links= {links}
							logoType = 'default'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
