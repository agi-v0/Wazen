import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import Image from 'next/image'
import dropdown from '../../../public/accounting-full-option.svg'

export default function Brief({
	pretitle,
	content,
	image,
	onRight,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	image: any
	onRight: boolean
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h1 font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-large mx-auto max-w-xl text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}
	return (
		<section className={'py-[var(--size--2rem)]'}>
			<div
				className={cn(
					onRight ? 'lg:flex-row' : 'lg:flex-row-reverse',
					'fluid-gap section flex w-full flex-col items-center justify-evenly',
				)}
			>
				<div className="-bg-white relative w-full overflow-hidden rounded-lg p-2 lg:aspect-square lg:max-w-[500px]">
					{image && 'asset' in image ? (
						<Img image={image} imageWidth={3000} className="rounded-xl" />
					) : (
						image
					)}
				</div>
				<div
					className={'flex max-w-2xl flex-col gap-6'}
					// style={{ textAlign: stegaClean(textAlign) }}
				>
					<Pretitle className={'text-large font-semibold text-gray-400'}>
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={components} />
				</div>
			</div>
		</section>
	)
}
