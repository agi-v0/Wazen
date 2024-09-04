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
import { set2 } from '@/components/ui/portable-text'

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
	return (
		<section
			className={cn(
				'fluid-gap section flex w-full flex-col items-center justify-evenly py-[var(--size--2rem)]',
				onRight ? 'lg:flex-row' : 'lg:flex-row-reverse',
			)}
		>
			<div className="relative w-full rounded-lg p-2 lg:aspect-square lg:max-w-[500px]">
				{image && 'asset' in image ? (
					<Img
						image={image}
						imageWidth={2000}
						className="relative h-auto w-full overflow-hidden rounded-lg object-cover p-2 lg:aspect-square lg:max-w-[500px]"
					/>
				) : (
					image
				)}
			</div>
			<div
				className="flex max-w-2xl flex-col gap-6"
				// style={{ textAlign: stegaClean(textAlign) }}
			>
				<Pretitle className="text-base font-medium text-teal-500">
					{pretitle}
				</Pretitle>
				<PortableText value={content} components={set2} />
			</div>
		</section>
	)
}
