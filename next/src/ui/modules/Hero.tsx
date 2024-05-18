import Img, { Source } from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import Pretitle from '@/ui/Pretitle'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'

export default function Hero({
	pretitle,
	mainTitle,
	Subtitle,
	ctas,
	bgImage,
	bgImageMobile,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	mainTitle: any
	Subtitle: any
	ctas: Sanity.CTA[]
	bgImage: Sanity.Image
	bgImageMobile: Sanity.Image
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const hasImage = !!bgImage?.asset

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h1') {
					return (
						<h1 className="mx-auto my-6 max-w-3xl leading-8 text-5xl text-white drop-shadow-md md:text-8xl">
							{value.children.map((child: any) => child.text).join('')}
						</h1>
					)
				}
				return (
					<p className="text-md my-10 max-w-xl md:max-w-2xl md:text-xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section
			className={cn(
				hasImage && 'grid bg-ink text-canvas *:col-span-full *:row-span-full',
			)}
		>
			{bgImage && (
				<picture>
					<Source image={bgImageMobile} />
					<Img
						className="size-full max-h-fold object-cover"
						image={bgImage}
						draggable={false}
						imageWidth={1800}
					/>
				</picture>
			)}
			<div className="flex h-screen w-full flex-col items-center justify-center gap-y-5 bg-gradient-to-b from-teal-400 to-white">
				<div
					className={cn('richtext relative [&_:is(h1,h2)]:text-balance')}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<Pretitle
						className={cn(
							hasImage
								? 'text-canvas/70'
								: 'mx-auto my-4 w-fit rounded-full border-2 border-white bg-white/35 p-2 text-black',
						)}
					>
						{pretitle}
					</Pretitle>
					<PortableText value={mainTitle} components={components} />
					<PortableText value={Subtitle} components={components} />
					<CTAList
						ctas={ctas}
						className={cn({
							'justify-start': stegaClean(textAlign) === 'left',
							'justify-center': stegaClean(textAlign) === 'center',
							'justify-end': stegaClean(textAlign) === 'right',
						})}
					/>
				</div>
			</div>
		</section>
	)
}
