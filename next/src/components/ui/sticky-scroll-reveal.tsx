'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'

export const StickyScroll = ({
	content,
	contentClassName,
}: {
	content: {
		title: string
		description: string
		content?: React.ReactNode | any
		image: any
	}[]
	contentClassName?: string
}) => {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 my-4 text-balance text-start text-5xl leading-tight">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="my-4 max-w-md text-lg text-gray-600">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	const [activeCard, setActiveCard] = React.useState(0)
	const ref = useRef<any>(null)
	const { scrollYProgress } = useScroll({
		// uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
		target: ref,
		// container: ref,
		offset: ['start start', 'end start'],
	})
	const cardLength = content.length

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		const cardsBreakpoints = content.map((_, index) => index / cardLength)
		const closestBreakpointIndex = cardsBreakpoints.reduce(
			(acc, breakpoint, index) => {
				const distance = Math.abs(latest - breakpoint)
				if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
					return index
				}
				return acc
			},
			0,
		)
		setActiveCard(closestBreakpointIndex)
	})

	const linearGradients = [
		'linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))',
		'linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))',
		'linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))',
	]

	const images = content.map((item) => item.image)

	const [backgroundGradient, setBackgroundGradient] = useState(
		linearGradients[0],
	)

	const [imageList, setImageList] = useState(images[0])

	useEffect(() => {
		setBackgroundGradient(linearGradients[activeCard % linearGradients.length])
		setImageList(images[activeCard % images.length])
	}, [activeCard])

	// console.log(content)

	return (
		<motion.div className="flex justify-between space-x-10" ref={ref}>
			<div className="flex flex-col items-start gap-32 px-4">
				{content.map((item, index) => (
					<div key={item.content + index} className="my-10">
						<motion.div
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: activeCard === index ? 1 : 0.3,
							}}
							className="font-bold md:text-5xl"
						>
							<PortableText value={item.content} components={components} />
						</motion.div>
					</div>
				))}
			</div>
			<div className="sticky left-0 top-32 hidden h-full md:block">
				<div className="flex items-center justify-center">
					<div
						style={{ background: backgroundGradient }}
						className={cn(
							'absolute z-0 h-[300px] w-[300px] rounded-full blur-2xl',
							contentClassName,
						)}
					/>
					<Img
						image={imageList}
						imageWidth={450}
						className="top-20 z-10 rounded-xl object-cover"
					/>
				</div>
			</div>
		</motion.div>
	)
}
