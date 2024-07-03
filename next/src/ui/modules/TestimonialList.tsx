'use client'

import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'
import Img from '../Img'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

export default function TestimonialList({
	content,
	testimonials,
}: Partial<{
	content: any
	testimonials: Sanity.Testimonial[]
}>) {
	let direction = 'left'
	let speed = 'normal'
	let pauseOnHover = true

	const containerRef = useRef<HTMLDivElement>(null)
	const scrollerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		addAnimation()
	}, [])
	const [start, setStart] = useState(false)
	function addAnimation() {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children)

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true)
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem)
				}
			})

			getDirection()
			getSpeed()
			setStart(true)
		}
	}
	const getDirection = () => {
		if (containerRef.current) {
			if (direction === 'left') {
				containerRef.current.style.setProperty(
					'--animation-direction',
					'forwards',
				)
			} else {
				containerRef.current.style.setProperty(
					'--animation-direction',
					'reverse',
				)
			}
		}
	}
	const getSpeed = () => {
		if (containerRef.current) {
			if (speed === 'fast') {
				containerRef.current.style.setProperty('--animation-duration', '20s')
			} else if (speed === 'normal') {
				containerRef.current.style.setProperty('--animation-duration', '40s')
			} else {
				containerRef.current.style.setProperty('--animation-duration', '80s')
			}
		}
	}

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				if (value.style === 'h3') {
					return (
						<h3 className="font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h3>
					)
				}
				return (
					<p className="text-main mx-auto max-w-xl text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}
	return (
		<section
			className="section fluid-vertical-space space-y-8 overflow-hidden text-center"
			ref={containerRef}
		>
			{content && <PortableText value={content} components={components} />}

			<div
				ref={scrollerRef}
				className={cn(
					'flex items-center gap-x-8 before:m-auto after:m-auto',
					start && 'animate-scroll',
					pauseOnHover && 'hover:[animation-play-state:paused]',
				)}
			>
				{testimonials?.map(({ author, ...testimonial }, key) => (
					<div
						key={key}
						className="flex w-[420px] flex-shrink-0 flex-row rounded-md bg-white p-6 shadow-md"
					>
						<article className="flex flex-col justify-between">
							<blockquote className="space-y-6">
								<div className="richtext text-start">
									<PortableText
										value={testimonial.content}
										components={components}
									/>
								</div>

								{author && (
									<footer>
										<div className="flex items-center justify-start gap-2">
											<Img
												className="size-[40px] rounded-full object-cover"
												image={author?.image}
												imageWidth={80}
											/>
											<div className={cn('text-main text-start')}>
												<div className="font-semibold text-gray-950">
													{author?.name}
												</div>
												{author?.title && (
													<div className="text-gray-400">{author?.title}</div>
												)}
											</div>
										</div>
									</footer>
								)}
							</blockquote>
						</article>
					</div>
				))}
			</div>
		</section>
	)
}
