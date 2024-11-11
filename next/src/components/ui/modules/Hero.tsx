import Image from 'next/image'
import { cn } from '@/lib/utils'
import { PortableText } from '@portabletext/react'
import CTAList from '@/components/ui/CTAList'
import lightray from '../../../../public/lightrays3.svg'
import { PiSealCheck } from '@/components/ui/Icons'
import { hero } from '@/components/ui/portable-text'
import { ContainerScroll } from '@/components/animated/container-scroll-animation'
import Img from '../Img'

export default function Hero({
	pretitle,
	content,
	image,
	ctas,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image
}>) {
	return (
		<section
			className="-hero-background relative min-h-screen"
			style={{
				backgroundImage: `linear-gradient(to bottom, transparent, white), radial-gradient(ellipse at top center, #155e75 0%, #2dd4bf 60%, #ffffff 100%)`,
			}}
		>
			<div
				style={{ position: 'absolute', top: 0, height: '100%', width: '100%' }}
			>
				<Image
					src={lightray}
					alt="hero"
					className="pointer-events-none sticky left-0 right-0 top-0 mx-auto h-screen w-full object-cover mix-blend-overlay"
					draggable={false}
				/>
			</div>
			<div className="section relative flex w-full flex-col justify-center">
				<div className="relative space-y-6 pt-[25vh] text-center text-white">
					<span className="text-small mx-auto flex w-fit grow-0 flex-row items-center gap-2 rounded-full bg-cyan-950/40 px-4 py-2 font-normal text-white">
						<PiSealCheck className="size-5" />
						{pretitle}
					</span>
					<PortableText value={content} components={hero} />
					<CTAList
						ctas={ctas}
						className={cn('justify-center text-white *:h-12 *:px-6 *:text-lg')}
					/>
				</div>
				<ContainerScroll>
					<Img
						image={image}
						alt={image?.alt}
						imageWidth={3000}
						className="mx-auto h-auto w-full rounded-lg object-cover object-left-top"
						draggable={false}
						fetchPriority="high"
						loading="eager"
					/>
				</ContainerScroll>
			</div>
		</section>
	)
}
