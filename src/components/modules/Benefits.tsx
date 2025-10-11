'use client'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useMotionValueEvent, useScroll, AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'

import { Img } from '@/components/Img'
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
	const [activeCard, setActiveCard] = useState(0)

	const ref = useRef<any>(null)
	const { scrollYProgress } = useScroll({
		// uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
		target: ref,
		// container: ref,
		offset: ['start start', 'end start'],
	})
	const benefitsCount = benefits.length

	if (!benefits || benefitsCount === 0) return null

	const cardsBreakpoints = useMemo(
		() => benefits.map((_: any, index: any) => index / benefitsCount),
		[benefits, benefitsCount],
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

	const isDesktop = useMediaQuery('(min-width: 1280px)')

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 font-semibold text-balance text-cyan-950 ltr:leading-tight">
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
	return (
		<section
			className={'section fluid-vertical-space px-(--padding-horizontal--main)'}
		>
			{isDesktop ? (
				<m.div className="fluid-gap relative flex flex-row pb-12" ref={ref}>
					<div
						className="flex h-[calc(var(--item-count)*100vh)] w-full flex-col items-start"
						style={
							{
								'--item-count': benefitsCount,
							} as React.CSSProperties
						}
					>
						{benefits.map((item: any, index: any) => {
							return (
								<m.div
									initial={{
										opacity: 0,
									}}
									animate={{
										opacity: activeCard === index ? 1 : 0.3,
									}}
									className={cn(
										'flex h-screen w-full flex-col justify-center space-y-6 py-6 pe-6',
									)}
									key={'desktop_' + item.content + index}
								>
									<PortableText value={item.content} components={components} />
								</m.div>
							)
						})}
					</div>

					<AnimatePresence mode="wait">
						<m.div
							className="sticky top-0 flex h-screen items-center"
							key={'desktop_' + activeCard}
							initial={{ opacity: 0, transform: 'translateY(-40px)' }}
							animate={{ opacity: 1, transform: 'translateY(0)' }}
							exit={{ opacity: 0, transform: 'translateY(40px)' }}
							transition={{ ease: 'easeOut' }}
						>
							<Img
								image={benefits[activeCard].image}
								className="relative aspect-4/3 h-auto w-full overflow-hidden rounded-2xl border-8 border-white object-cover shadow-md"
							/>
						</m.div>
					</AnimatePresence>
				</m.div>
			) : (
				<m.div
					className="flex flex-col gap-6 px-(--padding-horizontal--main) xl:hidden"
					ref={ref}
				>
					{benefits.map((item: any, index: any) => {
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
									image={benefits[index].image}
									className="relative aspect-4/3 h-auto w-full overflow-hidden rounded-2xl border-8 border-white object-cover shadow-md lg:max-w-[450px]"
								/>
							</m.div>
						)
					})}
				</m.div>
			)}
		</section>
	)
}
