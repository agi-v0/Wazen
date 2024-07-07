'use client'

import { cn } from '@/utils/cn'
import React, { useEffect, useState } from 'react'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'

export const InfiniteMovingCards = ({
	items,
	direction = 'left',
	speed = 'fast',
	pauseOnHover = true,
	className,
}: {
	items: Sanity.Testimonial[]
	direction?: 'left' | 'right'
	speed?: 'fast' | 'normal' | 'slow'
	pauseOnHover?: boolean
	className?: string
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null)
	const scrollerRef = React.useRef<HTMLUListElement>(null)

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
					<p className="text-main mx-auto max-w-xl text-start text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}
	return (
		<div
			ref={containerRef}
			className={cn(
				'scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
				className,
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					'flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4',
					start && 'animate-scroll',
					pauseOnHover && 'hover:[animation-play-state:paused]',
				)}
			>
				{items &&
					items.map(({ content, author }, idx: any) => (
						<li
							key={idx}
							className={`flex w-[420px] flex-shrink-0 flex-row items-center justify-between rounded-2xl bg-white p-6 shadow-md`}
						>
							<div className="flex flex-col justify-between gap-6">
								<div className="richtext text-start">
									<PortableText value={content} components={components} />
								</div>

								{author && (
									<footer>
										<div className="flex items-center justify-start gap-2">
											{/* <Img
												className="size-[40px] rounded-full object-cover"
												image={author?.image}
												imageWidth={80}
											/> */}
											<div className={cn('text-start text-base')}>
												<div className="font-semibold text-gray-600">
													{author?.name}
												</div>
												{author?.title && (
													<div className="text-gray-400">{author?.title}</div>
												)}
											</div>
										</div>
									</footer>
								)}
							</div>
						</li>
					))}
			</ul>
		</div>
	)
}
