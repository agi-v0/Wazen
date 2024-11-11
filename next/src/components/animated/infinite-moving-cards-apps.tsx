'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'

type CardItem = {
	title: string
	icon: string
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
	const [start, setStart] = useState(false)

	const animationDirection = direction === 'left' ? 'forwards' : 'reverse'
	const animationDuration = SPEED_MAP[speed]

	useEffect(() => {
		if (containerRef.current) {
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

	const renderItems = (itemsToRender: CardItem[]) => {
		return itemsToRender.map(({ title, icon }, index) => (
			<li
				key={`${title}-${index}`}
				className="flex h-full flex-row items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3"
			>
				<p className="text-start text-base font-medium text-gray-600">
					{title}
				</p>
				<Icon
					icon={icon || 'ph:cube-duotone'}
					className="text-xl text-gray-600"
				/>
			</li>
		))
	}

	return (
		<div
			ref={containerRef}
			className="flex w-full flex-col items-center justify-center overflow-x-hidden"
		>
			<ul
				className={cn(
					'mx-auto flex w-max min-w-full shrink-0 flex-nowrap gap-2',
					start && 'animate-scroll',
					pauseOnHover && 'hover:[animation-play-state:paused]',
				)}
			>
				{renderItems(items)}
				{renderItems(items)}
			</ul>
		</div>
	)
}
