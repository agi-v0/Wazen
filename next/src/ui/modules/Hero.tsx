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
import Image from 'next/image'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'

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
						<h1 className="mx-auto max-w-3xl text-center leading-tight drop-shadow-md">
							{value.children.map((child: any) => child.text).join('')}
						</h1>
					)
				}
				return (
					<p className="mx-auto max-w-xl text-base md:max-w-3xl md:text-xl">
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
			<div className="hero-background flex h-screen w-full flex-col items-center justify-center gap-y-6">
				<div
					className={cn(
						'richtext relative text-white [&_:is(h1,h2)]:text-balance',
					)}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<Pretitle
						className={cn(
							hasImage
								? 'text-white/40'
								: 'mx-auto w-fit rounded-full border border-white bg-white/20 px-6 py-2 font-normal text-white',
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

			<div className="flex flex-col items-center overflow-hidden">
				<div className="w-[80%]">
					<ContainerScroll>
						<Image
							src={`/dashboard-image.png`}
							alt="hero"
							height={720}
							width={1400}
							className="mx-auto h-full rounded-2xl object-cover object-left-top"
							draggable={false}
						/>
					</ContainerScroll>
				</div>
			</div>
		</section>
	)
}
