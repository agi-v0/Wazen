'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { PortableText, PortableTextTypeComponentProps } from 'next-sanity'
import { Img } from '@/components/Img'

type TestimonialListProps = {
	direction?: 'left' | 'right'
	speed?: 'fast' | 'normal' | 'slow'
	pauseOnHover?: boolean
	content?: any
	testimonials: Sanity.Testimonial[]
	locale: 'en' | 'ar'
	className?: string
}

const SPEED_MAP = {
	fast: '10s',
	normal: '40s',
	slow: '100s',
}

export default function TestimonialList({
	locale,
	content,
	testimonials,
	direction = 'left',
	speed = 'slow',
	pauseOnHover = true,
}: TestimonialListProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const scrollerRef = useRef<HTMLUListElement>(null)
	const [start, setStart] = useState(false)

	const animationDirection = direction === 'left' ? 'forwards' : 'reverse'
	const animationDuration = SPEED_MAP[speed]

	useEffect(() => {
		if (
			containerRef.current &&
			scrollerRef.current &&
			testimonials?.length > 0
		) {
			const scrollerContent = Array.from(scrollerRef.current.children)

			while (scrollerRef.current.children.length > testimonials.length) {
				scrollerRef.current.removeChild(scrollerRef.current.lastChild!)
			}

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true)
				scrollerRef.current?.appendChild(duplicatedItem)
			})

			containerRef.current.style.setProperty(
				'--animation-direction',
				animationDirection,
			)
			containerRef.current.style.setProperty(
				'--animation-duration',
				animationDuration,
			)

			setStart(true)
		}
	}, [animationDirection, animationDuration, testimonials])

	const allTestimonials = testimonials

	const components = useMemo(
		() => ({
			types: {
				block: ({ value }: PortableTextTypeComponentProps<any>) => {
					if (value.style === 'h2') {
						return (
							<h2 className="h2 leading-tight font-semibold text-cyan-950">
								{value.children.map((child: any) => child.text).join('')}
							</h2>
						)
					}
					if (value.style === 'h3') {
						return (
							<h3 className="leading-tight font-semibold text-cyan-950">
								{value.children.map((child: any) => child.text).join('')}
							</h3>
						)
					}
					return (
						<p className="text-main mx-auto max-w-xl text-cyan-950 md:max-w-3xl">
							{value.children.map((child: any) => child.text).join('')}
						</p>
					)
				},
			},
		}),
		[],
	)
	const renderedTestimonials = useMemo(
		() =>
			Array.isArray(allTestimonials)
				? allTestimonials?.map(({ content, author }, key) => {
						return (
							<li
								key={key}
								className="group flex w-full max-w-[420px] shrink-0 scale-95 flex-row rounded-2xl border-2 border-teal-500/20 bg-white/80 p-6 transition-all hover:scale-100 hover:border-0 hover:bg-teal-500/20 hover:shadow-lg"
							>
								<article className="flex flex-col justify-between">
									<div className="text-start group-hover:text-cyan-800">
										<PortableText value={content} components={components} />
									</div>

									{author && (
										<footer>
											<div className="flex items-center justify-start gap-4">
												<Img
													className="size-12 rounded-full object-cover"
													image={author?.image}
												/>
												<div className={cn('text-main text-start')}>
													<div className="font-semibold text-cyan-950">
														{author?.name}
													</div>
													{author?.title && (
														<div className="text-cyan-950/60">
															{author?.title}
														</div>
													)}
												</div>
											</div>
										</footer>
									)}
								</article>
							</li>
						)
					})
				: [],
		[allTestimonials, components],
	)

	if (!allTestimonials || allTestimonials.length === 0) {
		return null
	}

	return (
		<div
			className="fluid-gap max-h-fold flex h-full w-full max-w-screen flex-col items-center justify-center overflow-hidden bg-white py-(--size--8rem)"
			ref={containerRef}
		>
			<div className="section mx-auto text-center">
				{content && <PortableText value={content} components={components} />}
			</div>
			<ul
				ref={scrollerRef}
				className={cn(
					'flex w-max min-w-full shrink-0 flex-nowrap gap-2 py-4',
					start && 'animate-scroll',
					pauseOnHover && 'hover:[animation-play-state:paused]',
				)}
			>
				{renderedTestimonials}
			</ul>
		</div>
	)
}
