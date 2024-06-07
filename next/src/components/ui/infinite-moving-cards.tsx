'use client'

import { cn } from '@/lib/utils'
import Img from '@/ui/Img'
import React, { useEffect, useState } from 'react'
import { PiCaretRightBold, PiNotebookDuotone } from 'react-icons/pi'

export const InfiniteMovingCards = ({
	direction = 'left',
	speed = 'fast',
	pauseOnHover = true,
	links,
}: {
	direction?: 'left' | 'right'
	speed?: 'fast' | 'normal' | 'slow'
	pauseOnHover?: boolean
	links: any
}) => {
	console.log(links)

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
					' my-4 flex w-max min-w-full shrink-0 flex-nowrap gap-4',
					start && 'animate-scroll ',
					pauseOnHover && 'hover:[animation-play-state:paused]',
				)}
			>
				{links.map((link: any, idx: any) => (
					<li
						key={idx}
						className={`flex w-[450px] flex-shrink-0 flex-row items-center justify-between rounded-md bg-white p-3 shadow-md`}
					>
						<div className="flex flex-col justify-start">
							<h3 className="text-start text-2xl">{link.mainLabel}</h3>
							<div className="mt-6">
								<span className="link flex items-center gap-1 text-teal-600 no-underline">
									{link.LinkLabel}
									<PiCaretRightBold className="size-3 rotate-180 text-teal-600" />
								</span>
							</div>
						</div>
						<div className="rounded-md bg-teal-50 p-4 text-8xl">
							<Img image={link.image} imageWidth={800} />
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
