'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { motion } from 'framer-motion'
import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'

export default function Benefits({
	benefits,
}: Partial<{
	benefits: any
}>) {
	const content = benefits

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 text-balance text-start text-5xl font-semibold leading-tight">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-main max-w-md text-gray-600">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	const [activeCard, setActiveCard] = useState(0)
	const ref = useRef<any>(null)
	const { scrollYProgress } = useScroll({
		// uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
		target: ref,
		// container: ref,
		offset: ['start start', 'end start'],
	})
	const cardLength = content.length

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		const cardsBreakpoints = content.map(
			(_: any, index: any) => index / cardLength,
		)
		const closestBreakpointIndex = cardsBreakpoints.reduce(
			(acc: any, breakpoint: any, index: any) => {
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

	const numbers = [1, 2, 3]

	const linearGradients = [
		'linear-gradient(to bottom right, var(--indigo-300), var(--lime-300))',
		'linear-gradient(to bottom right, var(--lime-300), var(--cyan-300))',
		'linear-gradient(to bottom right, var(--cyan-300), var(--indigo-300))',
	]

	const images = content.map((item: any) => item.image)

	const [backgroundGradient, setBackgroundGradient] = useState(
		linearGradients[0],
	)

	const [imageList, setImageList] = useState(images[0])

	useEffect(() => {
		setBackgroundGradient(linearGradients[activeCard % linearGradients.length])
		setImageList(images[activeCard % images.length])
	}, [activeCard])

	return (
		<section className={'section py-12'}>
			<motion.div className="flex justify-between space-x-10" ref={ref}>
				<div className="sticky top-32 hidden h-full md:block">
					<div className="mb-32 flex flex-col items-center justify-center">
						{numbers.map((number, index) => (
							<motion.div
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: activeCard === index ? 1 : 0.3,
								}}
								className="text-large my-2 font-semibold"
								key={number + index}
							>
								{number}
							</motion.div>
						))}
					</div>
				</div>

				<div className="flex flex-col items-start gap-32 px-4">
					{content.map((item: any, index: any) => {
						return (
							<motion.div
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: activeCard === index ? 1 : 0.3,
								}}
								className="my-10 space-y-4"
								key={item.content + index}
							>
								<PortableText value={item.content} components={components} />
							</motion.div>
						)
					})}
				</div>

				<div className="sticky left-0 top-32 hidden h-full md:block">
					<div className="flex items-center justify-center">
						<div
							style={{ background: backgroundGradient }}
							className={
								'absolute z-0 h-[300px] w-[300px] rounded-full blur-2xl'
							}
						/>
						<Img
							image={imageList}
							imageWidth={450}
							className="top-20 z-10 rounded-xl object-cover"
						/>
					</div>
				</div>
			</motion.div>
		</section>
	)
}
