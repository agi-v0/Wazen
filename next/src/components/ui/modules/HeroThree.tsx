import { Img } from '@/components/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '@/components/ui/CTAList'
import Pretitle from '../Pretitle'
import Image from 'next/image'
import blob from '../../../../public/gradient-blob2.svg'
import * as m from 'motion/react-m'

export default function HeroThree({
	pretitle,
	content,
	ctas,
	image,
}: Partial<{
	pretitle: any
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image & { onRight?: boolean }
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const FADE_DOWN_ANIMATION_VARIANTS = {
		hidden: { opacity: 0, y: -10 },
		show: { opacity: 1, y: 0, transition: { type: 'spring' } },
	}

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h1') {
					return (
						<m.h1
							className="h1 text-pretty font-semibold leading-tight text-cyan-950"
							variants={FADE_DOWN_ANIMATION_VARIANTS}
						>
							{value.children.map((child: any) => child.text).join('')}
						</m.h1>
					)
				}
				if (value.style === 'h2') {
					return (
						<m.h2
							className="text-large font-semibold leading-tight text-teal-600"
							variants={FADE_DOWN_ANIMATION_VARIANTS}
						>
							{value.children.map((child: any) => child.text).join('')}
						</m.h2>
					)
				}
				return (
					<m.p
						className="text-main mx-auto text-cyan-950/80 md:max-w-3xl"
						variants={FADE_DOWN_ANIMATION_VARIANTS}
					>
						{value.children.map((child: any) => child.text).join('')}
					</m.p>
				)
			},
		},
	}

	return (
		<section className="section bg-white max-lg:pt-16">
			<m.div
				className={
					'md:fluid-gap flex w-full flex-col items-center justify-evenly gap-8 lg:min-h-screen lg:flex-row'
				}
				initial="hidden"
				animate="show"
				viewport={{ once: true }}
				variants={{
					hidden: {},
					show: {
						transition: {
							staggerChildren: 0.15,
						},
					},
				}}
			>
				<m.div
					className="h-auto w-full lg:max-w-[560px]"
					variants={FADE_DOWN_ANIMATION_VARIANTS}
				>
					<Img
						image={image}
						alt={image?.alt || pretitle}
						className="relative aspect-[4/3] h-auto w-full overflow-hidden rounded-2xl border-8 border-white object-cover shadow-md lg:aspect-square lg:max-w-[560px]"
						draggable={false}
						fetchPriority="high"
						loading="eager"
					/>
				</m.div>
				<div className="flex flex-col items-start gap-6">
					<Pretitle className="text-base font-medium text-gray-400">
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={components} />
					<CTAList
						ctas={ctas}
						className="mt-2 w-full *:h-12 *:text-lg *:max-md:w-full"
					/>
				</div>

				<Image
					src={blob}
					alt="hero"
					className="pointer-events-none absolute z-[-1] aspect-square h-[100%] w-auto object-cover"
					draggable={false}
				/>
			</m.div>
		</section>
	)
}
