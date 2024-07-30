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
				containerRef.current.style.setProperty('--animation-duration', '10s')
			} else if (speed === 'normal') {
				containerRef.current.style.setProperty('--animation-duration', '40s')
			} else {
				containerRef.current.style.setProperty('--animation-duration', '100s')
			}
		}
	}

	const colors = [
		'to-yellow-50',
		'to-lime-50',
		'to-teal-50',
		'to-cyan-50',
		'to-violet-50',
		'to-fuchsia-50',
	]
	console.log(items)

	return (
		<div
			ref={containerRef}
			className="flex w-full flex-col items-center justify-evenly overflow-x-hidden bg-cyan-950/5"
		>
			<ul
				ref={scrollerRef}
				className={cn(
					'my-4 flex w-max min-w-full shrink-0 flex-nowrap gap-4',
					start && 'animate-scroll',
					pauseOnHover && 'hover:[animation-play-state:paused]',
				)}
			>
				{items.map(({ title, description, link, image }, idx: any) => {
					return (
						<li
							key={idx}
							className={`-from-40% scale-100 bg-gradient-to-br from-white hover:scale-105 ${colors[idx]} grid grid-cols-2 items-center justify-between rounded-lg border border-gray-100 p-3 transition-all hover:shadow-lg lg:w-[600px]`}
						>
							<div className="flex h-full flex-col gap-4 p-4">
								<h3 className="text-main text-start text-2xl font-semibold">
									{title}
								</h3>
								<p className="text-start text-sm text-gray-500">
									{description}
								</p>
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
					)
				})}
			</ul>
		</div>
	)
}
