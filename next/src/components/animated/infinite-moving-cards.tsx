'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { PiCaretRightBold } from '@/ui/Icons'
import Img from '@/ui/Img'

type CardItem = {
	title: string
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

const COLORS = [
	'to-yellow-50',
	'to-lime-50',
	'to-teal-50',
	'to-cyan-50',
	'to-violet-50',
	'to-fuchsia-50',
]

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
			items.map(({ title, description, link, image }, idx) => (
				<li
					key={idx}
					className={cn(
						'-from-40% scale-100 bg-gradient-to-br from-white hover:scale-105',
						COLORS[idx % COLORS.length],
						'grid grid-cols-2 items-center justify-between rounded-lg border border-gray-100 p-3 transition-all hover:shadow-lg lg:w-[600px]',
					)}
				>
					<div className="flex h-full flex-col gap-4 p-4">
						<h3 className="text-main text-start text-2xl font-semibold">
							{title}
						</h3>
						<p className="text-start text-sm text-gray-500">{description}</p>
						<div className="flex items-center gap-1 text-teal-600 no-underline">
							{link.label}
							<PiCaretRightBold className="size-3 rotate-180 text-teal-600" />
						</div>
					</div>
					<Img
						image={image}
						imageWidth={300}
						className="aspect-square h-full w-auto rounded-md object-cover object-center"
					/>
				</li>
			)),
		[items],
	)

	return (
		<div
			ref={containerRef}
			className="flex w-full flex-col items-center justify-evenly overflow-x-hidden"
		>
			<ul
				ref={scrollerRef}
				className={cn(
					'my-4 flex w-max min-w-full shrink-0 flex-nowrap gap-4',
					start && 'animate-scroll',
					pauseOnHover && 'hover:[animation-play-state:paused]',
				)}
			>
				{renderedItems}
			</ul>
		</div>
	)
}
