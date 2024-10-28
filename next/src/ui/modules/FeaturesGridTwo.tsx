'use client'

import { useRef } from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { m, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'

import Pretitle from '@/ui/Pretitle'
import Img from '../Img'

type Feature = {
	icon: { name: string }
	image: Sanity.Image
	title: string
	description: string
}

type FeaturesGridTwoProps = {
	pretitle?: string
	content?: any
	ctas?: any
	features?: { features: Feature[] }[]
	textAlign?: React.CSSProperties['textAlign']
}

const FADE_UP_ANIMATION_VARIANTS = {
	hidden: { opacity: 0, y: 10 },
	show: { opacity: 1, y: 0, transition: { type: 'spring' } },
}

const portableTextComponents: PortableTextComponents = {
	block: ({ value }) => {
		const text = value.children.map((child: any) => child.text).join('')
		if (value.style === 'h2') {
			return (
				<h2 className="h2 font-semibold leading-tight text-cyan-950">{text}</h2>
			)
		}
		return (
			<p className="text-main mx-auto max-w-xl text-gray-600 md:max-w-3xl">
				{text}
			</p>
		)
	},
}

const FeatureItem = ({ feature }: { feature: Feature }) => (
	<m.li
		className="group flex max-h-[400px] w-full flex-col justify-start overflow-hidden rounded-xl text-start hover:bg-teal-100 lg:max-h-[500px]"
		variants={FADE_UP_ANIMATION_VARIANTS}
	>
		<div className="space-y-2 p-6">
			<div className="flex flex-row items-center gap-4">
				{feature.icon && (
					<div className="self-start rounded-md bg-cyan-800 p-2">
						<Icon icon={feature.icon.name} className="text-xl text-cyan-50" />
					</div>
				)}
				<h3 className="text-large font-semibold text-cyan-950 ltr:leading-tight">
					{feature.title}
				</h3>
			</div>
			<p className="text-pretty text-base text-cyan-950/80">
				{feature.description}
			</p>
		</div>
		<Img
			image={feature.image}
			imageWidth={640}
			alt={feature.title}
			svg={true}
			className="h-auto w-full translate-y-0 scale-[99%] px-6 opacity-90 transition-all ease-out group-hover:-translate-y-1 group-hover:scale-100 group-hover:opacity-100 group-hover:drop-shadow-lg"
		/>
	</m.li>
)

export default function FeaturesGridTwo({
	pretitle,
	content,
	features,
	textAlign = 'center',
}: FeaturesGridTwoProps) {
	return (
		<section className="bg-teal-400/10 py-[var(--size--4rem)]">
			<div className="section fluid-padding fluid-gap fluid-padding flex w-full flex-col items-center justify-center rounded-2xl bg-white">
				<div className="flex flex-col items-center gap-6">
					<Pretitle className="text-large font-semibold text-teal-500">
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={portableTextComponents} />
				</div>
				<div className="flex flex-col gap-6">
					{features?.map((block, index) => (
						<FeatureBlock key={index} features={block.features} />
					))}
				</div>
			</div>
		</section>
	)
}

const FeatureBlock = ({ features }: { features: Feature[] }) => {
	const ref = useRef<HTMLDivElement>(null)
	const isInView = useInView(ref)

	return (
		<div ref={ref}>
			<m.ul
				className="grid w-full grid-flow-row gap-6 *:bg-cyan-950/10 md:grid-flow-col"
				initial="hidden"
				animate={isInView ? 'show' : 'hidden'}
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
				{features.map((feature) => (
					<FeatureItem key={feature.title} feature={feature} />
				))}
			</m.ul>
		</div>
	)
}
