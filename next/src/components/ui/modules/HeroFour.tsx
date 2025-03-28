import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/components/ui/Pretitle'
import CTAList from '@/components/ui/CTAList'
import { Img, ResponsiveImg } from '@/components/ui/Img'
import { set2 } from '@/components/ui/portable-text'
import * as m from 'motion/react-m'

export default function HeroPostcard({
	pretitle,
	content,
	ctas,
	image,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image
}>) {
	const FADE_DOWN_ANIMATION_VARIANTS = {
		hidden: { opacity: 0, y: -10 },
		show: { opacity: 1, y: 0, transition: { type: 'spring' } },
	}
	return (
		<m.section
			className="cyan-gradient-background-2 relative flex min-h-screen flex-col gap-6 py-[20vh] lg:gap-12"
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
			<div className="relative mx-auto flex w-full max-w-screen-md flex-col items-center justify-center gap-6 px-[var(--padding-horizontal--main)] text-center">
				<Pretitle className="mb-2 text-base font-medium text-teal-500">
					{pretitle}
				</Pretitle>
				<PortableText value={content} components={set2} />
				<CTAList ctas={ctas} className="*:h-12 *:px-6 *:text-lg" />
			</div>
			<m.div
				variants={FADE_DOWN_ANIMATION_VARIANTS}
				className="section relative mx-auto h-auto w-full"
			>
				<Img
					image={image}
					alt={image?.alt}
					className="h-auto w-full object-cover object-left-top"
					draggable={false}
					fetchPriority="high"
					loading="eager"
					priority
				/>
			</m.div>
		</m.section>
	)
}
