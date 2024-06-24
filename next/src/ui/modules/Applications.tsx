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
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'

export default function Applications({
	pretitle,
	content,
	links,
	ctas,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	links: any
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
					{/* <Link
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
					</Link> */}
					<CTAList
						ctas={ctas}
						className={cn(
							{
								'justify-start': stegaClean(textAlign) === 'left',
								'justify-center': stegaClean(textAlign) === 'center',
								'justify-end': stegaClean(textAlign) === 'right',
							},
							'text-white *:h-12 *:px-6 *:text-lg',
						)}
					/>
				</div>
				<div className="bg-gradient-to-b from-white via-cyan-500/10 to-white py-12">
					<InfiniteMovingCards
						direction={'left'}
						speed={'slow'}
						pauseOnHover={true}
						links={links}
						logoType="default"
					/>
					<InfiniteMovingCards
						direction={'right'}
						speed={'slow'}
						pauseOnHover={true}
						links={links}
						logoType="default"
					/>
				</div>
			</div>
		</section>
	)
}
