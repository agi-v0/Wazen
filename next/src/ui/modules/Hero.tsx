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
import { ContainerScroll } from '@/components/animated/container-scroll-animation'
import lightray from '../../../public/lightrays3.svg'
import { PiSealCheck } from 'react-icons/pi'
import { set1 } from '@/components/ui/portable-text'

export default function Hero({
	pretitle,
	content,
	ctas,
	bgImage,
	bgImageMobile,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	bgImage: Sanity.Image
	bgImageMobile: Sanity.Image
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	return (
		<section
			className="relative"
			style={{
				backgroundImage: `linear-gradient(to bottom, transparent, white),
												radial-gradient(ellipse at top center, #155e75 0%, #2dd4bf 60%, #f0fdfa 100%)`,
			}}
		>
			<div className="absolute top-0 h-full w-full">
				{/* <Image
					src={lightray}
					alt="hero"
					className="pointer-events-none fixed left-0 right-0 top-0 mx-auto h-screen w-full object-cover mix-blend-overlay"
					draggable={false}
				/> */}
			</div>
			<div className="section relative flex w-full flex-col justify-center">
				<div
					className={cn('richtext relative space-y-6 pt-[25vh] text-white')}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<span className="text-small mx-auto flex w-fit grow-0 flex-row items-center gap-2 rounded-full bg-cyan-950/40 px-4 py-2 font-normal text-white">
						<PiSealCheck className="size-5" />
						{pretitle}
					</span>
					<PortableText value={content} components={set1} />
					<CTAList
						ctas={ctas}
						className={cn(
							{
								'justify-start': stegaClean(textAlign) === 'left',
								'justify-center': stegaClean(textAlign) === 'center',
								'justify-end': stegaClean(textAlign) === 'right',
							},
							'text-white *:h-12 *:px-6 *:text-lg *:outline',
						)}
					/>
				</div>
				<div className="mx-auto w-[85%]">
					<ContainerScroll>
						<Image
							src={`https://cdn.sanity.io/images/m7bjawr3/production/c971f5dc58e26dc7798d2bcd6acdf067328abbb8-1440x1024.svg`}
							alt="hero"
							height={1024}
							width={1440}
							className="mx-auto h-auto w-full object-cover object-left-top"
							draggable={false}
							loading="eager"
							priority
						/>
					</ContainerScroll>
				</div>
			</div>
		</section>
	)
}
