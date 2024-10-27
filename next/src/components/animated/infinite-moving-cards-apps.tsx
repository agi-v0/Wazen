'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'

type CardItem = {
	title: string
	icon: string
	description: string
	link: Sanity.Link
	image: Sanity.Image
}

type InfiniteMovingCardsProps = {
	direction?: 'left' | 'right'
	speed?: 'fast' | 'normal' | 'slow'
	pauseOnHover?: boolean
	items: CardItem[]
}
const SPEED_MAP = {
	fast: '10s',
	normal: '40s',
	slow: '100s',
}
export default function InfiniteMovingCards({
	direction = 'left',
	speed = 'normal',
	pauseOnHover = true,
	items,
}: InfiniteMovingCardsProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const scrollerRef = useRef<HTMLUListElement>(null)
	const [start, setStart] = useState(false)

	const animationDirection = direction === 'left' ? 'forwards' : 'reverse'
	const animationDuration = SPEED_MAP[speed]

	useEffect(() => {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children)

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
	}, [animationDirection, animationDuration])

	const renderedItems = useMemo(
		() =>
			items.map(({ title, icon }) => {
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
			}),
		[items],
	)

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
				{renderedItems}
			</ul>
		</div>
	)
}
