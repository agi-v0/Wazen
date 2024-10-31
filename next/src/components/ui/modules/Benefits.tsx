'use client'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion'
import { m } from 'framer-motion'
import Img from '@/components/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'

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
						<h2 className="h2 text-balance font-semibold text-cyan-950 ltr:leading-tight">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-main text-gray-950/80">
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

	const cardsBreakpoints = useMemo(
		() => content.map((_: any, index: any) => index / cardLength),
		[content, cardLength],
	)
	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
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

	const images = useMemo(
		() => content.map((item: any) => item.image),
		[content],
	)

	const [imageList, setImageList] = useState(images[0])

	useEffect(() => {
		setImageList(images[activeCard % images.length])
	}, [activeCard, images])

	const isDesktop = useMediaQuery('(min-width: 1280px)')

	return (
		<section
			className={
				'section fluid-vertical-space px-[var(--padding-horizontal--main)]'
			}
		>
			{isDesktop ? (
				<m.div className="fluid-gap flex pb-12" ref={ref}>
					{/* <div className="sticky top-32 hidden h-full md:block">
				<div className="flex h-80 flex-col items-center justify-between py-6">
					{numbers.map((number, index) => (
						<m.div
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
						</m.div>
					))}
				</div>
			</div> */}

					<div className="flex w-full flex-col items-start">
						{content.map((item: any, index: any) => {
							return (
								<m.div
									initial={{
										opacity: 0,
									}}
									animate={{
										opacity: activeCard === index ? 1 : 0.3,
									}}
									className={cn(
										'flex h-96 w-full flex-col justify-center space-y-6 py-6',
										index === 2 ? 'h-[446px]' : '',
									)}
									key={'desktop_' + item.content + index}
								>
									<PortableText value={item.content} components={components} />
								</m.div>
							)
						})}
					</div>

					<div className="sticky left-0 top-32 h-full w-full">
						<AnimatePresence mode="wait">
							<m.div
								key={activeCard}
								initial={{ opacity: 0, translateY: -40 }}
								animate={{ opacity: 1, translateY: 0 }}
								exit={{ opacity: 0.2, translateY: 40 }}
								transition={{ ease: 'easeOut' }}
							>
								<Img
									image={imageList}
									imageWidth={2400}
									className="relative aspect-[4/3] h-auto w-full overflow-hidden rounded-2xl border-8 border-white object-cover shadow-md fade-in fade-out"
								/>
							</m.div>
						</AnimatePresence>
					</div>
				</m.div>
			) : (
				<m.div
					className="flex flex-col gap-6 px-[var(--padding-horizontal--main)] xl:hidden"
					ref={ref}
				>
					{content.map((item: any, index: any) => {
						return (
							<m.div
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: activeCard === index ? 1 : 0.3,
								}}
								className="fluid-vertical-space flex w-full flex-col items-center justify-center gap-6 text-center"
								key={'mobile_' + item.content + index}
							>
								<PortableText value={item.content} components={components} />
								{/* <div className="relative flex items-center justify-center overflow-hidden rounded-lg border-8 border-white shadow-md"></div> */}
								<Img
									image={content?.[index].image}
									imageWidth={2400}
									className="relative aspect-[4/3] h-auto w-full overflow-hidden rounded-2xl border-8 border-white object-cover shadow-md lg:max-w-[450px]"
								/>
							</m.div>
						)
					})}
				</m.div>
			)}
		</section>
	)
}
