import Img, { Source } from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import CTA from '../CTA'
import Pretitle from '@/ui/Pretitle'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import Image from 'next/image'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import lightray from '../../../public/lightrays3.svg'
import { PiSealCheck } from 'react-icons/pi'

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
						<h1 className="mx-auto max-w-3xl text-balance text-center leading-tight drop-shadow-md">
							{value.children.map((child: any) => child.text).join('')}
						</h1>
					)
				}
				return (
					<p className="text-main mx-auto max-w-xl text-teal-50 drop-shadow-md md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section className="hero-background relative">
			<div className="absolute top-0 h-full w-full">
				<Image
					src={lightray}
					alt="hero"
					className="pointer-events-none fixed left-0 right-0 top-0 mx-auto h-screen w-full object-cover mix-blend-overlay"
					draggable={false}
				/>
			</div>
			<div className="section relative flex w-full flex-col justify-center">
				<div
					className={cn('richtext relative space-y-6 pt-[25vh] text-white')}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<span className="text-small mx-auto flex w-fit grow-0 flex-row items-center gap-2 rounded-full bg-cyan-950/20 px-6 py-1 font-normal text-white">
						<PiSealCheck className="size-7" />
						{pretitle}
					</span>
					<PortableText value={mainTitle} components={components} />
					<PortableText value={Subtitle} components={components} />
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
					{/* <div className="primary">text</div>
					<div className="secondary">text</div>
					<div className="tertiary">text</div> */}
				</div>
				<div className="">
					<div className="mx-auto w-[95%]">
						<ContainerScroll>
							<Image
								src={`/dashboard-image.svg`}
								alt="hero"
								height={1024}
								width={1440}
								className="mx-auto h-auto w-full object-cover object-left-top"
								draggable={false}
							/>
						</ContainerScroll>
					</div>
				</div>
			</div>
		</section>
	)
}
