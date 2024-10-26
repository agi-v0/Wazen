'use client'

import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

export default function InfiniteMovingCards({
	direction,
	speed,
	pauseOnHover = true,
	items,
}: {
	direction?: 'left' | 'right'
	speed?: 'fast' | 'normal' | 'slow'
	pauseOnHover?: boolean
	items: {
		title: string
		icon: string
		// description?: string
		// link?: Sanity.Link
		// image?: Sanity.Image
	}[]
}) {
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
				containerRef.current.style.setProperty('--animation-duration', '10s')
			} else if (speed === 'normal') {
				containerRef.current.style.setProperty('--animation-duration', '40s')
			} else {
				containerRef.current.style.setProperty('--animation-duration', '60s')
			}
		}
	}

	return (
		<div
			ref={containerRef}
			className="flex w-full flex-col items-center justify-center overflow-x-hidden"
		>
			<ul
				ref={scrollerRef}
				className={cn(
					'mx-auto flex w-max min-w-full shrink-0 flex-nowrap gap-4',
					start && 'animate-scroll',
					pauseOnHover && 'hover:[animation-play-state:paused]',
				)}
			>
				{items.map(({ title, icon }) => {
					return (
						<li
							key={title}
							className="flex h-full flex-row items-center justify-center gap-2 rounded-2xl border border-gray-200 p-4"
						>
							<Icon
								icon={icon ? icon : 'ph:cube-duotone'}
								className="text-xl text-gray-500"
							/>
							<p className="text-start text-base font-medium">{title}</p>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
