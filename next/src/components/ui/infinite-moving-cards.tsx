'use client'

import { cn } from '@/lib/utils'
import Img from '@/ui/Img'
import React, { useEffect, useState } from 'react'
import { PiCaretRightBold } from 'react-icons/pi'

export const InfiniteMovingCards = ({
	direction,
	speed,
	pauseOnHover = true,
	items,
}: {
	direction?: 'left' | 'right'
	speed?: 'fast' | 'normal' | 'slow'
	pauseOnHover?: boolean
	items: [
		{
			title: string
			description: string
			link: Sanity.Link
			image: Sanity.Image
		},
	]
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

	return (
		<div ref={containerRef}>
			<ul
				ref={scrollerRef}
				className={cn(
					'my-4 flex w-max min-w-full shrink-0 flex-nowrap gap-4',
					start && 'animate-scroll',
					pauseOnHover && 'hover:[animation-play-state:paused]',
				)}
			>
				{items.map(({ title, link, image }, idx: any) => {
					return (
						<li
							key={idx}
							className={`applist-background flex flex-shrink-0 flex-row items-center justify-between rounded-md p-3 shadow-md lg:w-[600px]`}
						>
							<div className="flex h-full flex-col justify-between p-4">
								<div>
									<h3 className="text-main text-start text-2xl font-semibold">
										{title}
									</h3>
									<p className="text-start text-sm font-semibold">
										{link.description}
									</p>
								</div>
								<div className="mt-6">
									<span className="link flex items-center gap-1 text-teal-600 no-underline">
										{link.label}
										<PiCaretRightBold className="size-3 rotate-180 text-teal-600" />
									</span>
								</div>
							</div>
							<div className="h-full w-full rounded-lg lg:max-w-[300px]">
								<Img
									image={image}
									imageWidth={300}
									className="w-[300px] rounded-md"
								/>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
