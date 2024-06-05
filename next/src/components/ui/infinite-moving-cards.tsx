'use client'

import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { PiCaretRightBold, PiNotebookDuotone } from 'react-icons/pi'

const items = [
	{
		title: 'عزز من تفاعل العملاء',
		link: 'تطبيق الإدارة المالية',
	},
	{
		title: 'حسن عمليات سلسلة الإمداد',
		link: 'تطبيق الإدارة المالية',
	},
	{
		title: 'راقب جميع عملياتك المالية',
		link: 'تطبيق الإدارة المالية',
	},
	{
		title: 'راقب مستويات المخزون وتتبع سلسلة الإمداد',
		link: 'تطبيق الإدارة المالية',
	},
	{
		title: 'اربط العمليات التشغيلية للمختلف الأقسام',
		link: 'تطبيق الإدارة المالية',
	},
	{
		title: 'بسط عمليات الموارد البشرية',
		link: 'تطبيق الإدارة المالية',
	},
]

export const InfiniteMovingCards = ({
	direction = 'left',
	speed = 'fast',
	pauseOnHover = true,
	className,
}: {
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
	return (
		<div ref={containerRef}>
			<ul
				ref={scrollerRef}
				className={cn(
					' flex w-max min-w-full shrink-0 flex-nowrap gap-4',
					start && 'animate-scroll ',
					pauseOnHover && 'hover:[animation-play-state:paused]',
				)}
			>
				{items.map((item, idx) => (
					<li
						key={idx}
						className={`flex max-w-[350px] flex-shrink-0 flex-row items-center justify-between rounded-md p-2 shadow-md`}
					>
						<div className="flex flex-col justify-start">
							<div className="text-start">{item.title}</div>
							<div className="mt-6">
								<span className="link flex items-center gap-1 text-teal-600 no-underline">
									{item.link}
									<PiCaretRightBold className="size-3 rotate-180 text-teal-600" />
								</span>
							</div>
						</div>
						<div className='text-8xl'>
							<PiNotebookDuotone />
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
