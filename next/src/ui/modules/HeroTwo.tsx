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

export default function HeroTwo({
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
						<h1 className="h1 mx-auto max-w-3xl text-center font-semibold leading-tight drop-shadow-md">
							{value.children.map((child: any) => child.text).join('')}
						</h1>
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
		<section className={'section py-12'}>
			{/* {bgImage && (
				<picture>
					<Source image={bgImageMobile} />
					<Img
						className="size-full max-h-fold object-cover"
						image={bgImage}
						draggable={false}
						imageWidth={1800}
					/>
				</picture>
			)} */}
			<div className="flex w-full flex-col items-center justify-center gap-y-6 rounded-2xl bg-gradient-to-br from-white from-65% to-cyan-100/50 p-12 py-24">
				<div
					className={cn('richtext relative space-y-6')}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<Pretitle
						className={cn(
							hasImage
								? 'text-white/40'
								: 'mx-auto w-fit rounded-full border border-white bg-white/20 px-6 py-1',
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
