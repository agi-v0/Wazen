'use client'
import React, { useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { motion } from 'framer-motion'
import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'
import { cn } from '@/lib/utils'

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
						<h2 className="h3 text-balance text-start font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-main max-w-xl text-gray-600">
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

	const images = content.map((item: any) => item.image)

	const [imageList, setImageList] = useState(images[0])

	return (
		<section
			className={
				'section fluid-vertical-space px-[var(--padding-horizontal--main)]'
			}
		>
			<motion.div
				className="fluid-gap hidden pb-12 xl:visible xl:flex"
				ref={ref}
			>
				{/* <div className="sticky top-32 hidden h-full md:block">
					<div className="flex h-80 flex-col items-center justify-between py-6">
						{numbers.map((number, index) => (
							<motion.div
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: activeCard === index ? 1 : 0.3,
								}}
								className="text-large font-semibold text-cyan-950"
								key={number + index}
							>
								{number}
							</motion.div>
						))}
					</div>
				</div> */}

				<div className="flex w-full flex-col items-start">
					{content.map((item: any, index: any) => {
						return (
							<motion.div
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: activeCard === index ? 1 : 0.3,
								}}
								className={cn(
									'flex h-96 w-full flex-col justify-center space-y-6 py-6',
									(index = 2 ? 'h-[446px]' : ''),
								)}
								key={item.content + index}
							>
								<PortableText value={item.content} components={components} />
							</motion.div>
						)
					})}
				</div>

				<div className="sticky left-0 top-32 h-full w-full">
					<Img
						image={imageList}
						imageWidth={640}
						className="relative aspect-[4/3] h-auto w-full overflow-hidden rounded-lg border-8 border-white object-cover shadow-md"
					/>
				</div>
			</motion.div>
			<motion.div
				className="flex flex-col gap-6 px-[var(--padding-horizontal--main)] xl:hidden"
				ref={ref}
			>
				{content.map((item: any, index: any) => {
					return (
						<motion.div
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: activeCard === index ? 1 : 0.3,
							}}
							className="fluid-vertical-space flex w-full flex-col items-center justify-center gap-6 text-center"
							key={item.content + index}
						>
							<PortableText value={item.content} components={components} />
							{/* <div className="relative flex items-center justify-center overflow-hidden rounded-lg border-8 border-white shadow-md"></div> */}
							<Img
								image={content?.[index].image}
								imageWidth={640}
								className="relative aspect-[4/3] h-auto w-full overflow-hidden rounded-2xl border-8 border-white object-cover shadow-md lg:max-w-[450px]"
							/>
						</motion.div>
					)
				})}
			</motion.div>
		</section>
	)
}
