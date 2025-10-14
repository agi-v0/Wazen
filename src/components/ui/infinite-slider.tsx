'use client'
import { cn } from '@/lib/utils'
import { useMotionValue, animate } from 'motion/react'
import * as m from 'motion/react-m'
import { useState, useEffect } from 'react'
import useMeasure from 'react-use-measure'

export type InfiniteSliderProps = {
	children: React.ReactNode
	gap?: number
	speed?: number
	speedOnHover?: number
	direction?: 'horizontal' | 'vertical'
	reverse?: boolean
	dir?: 'ltr' | 'rtl'
	className?: string
}

export function InfiniteSlider({
	children,
	gap = 16,
	speed = 100,
	speedOnHover,
	direction = 'horizontal',
	reverse = false,
	dir = 'ltr',
	className,
}: InfiniteSliderProps) {
	const [currentSpeed, setCurrentSpeed] = useState(speed)
	const [ref, { width, height }] = useMeasure()
	const translation = useMotionValue(0)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [key, setKey] = useState(0)

	const isRtlContext = dir === 'rtl'
	const isHorizontal = direction === 'horizontal'

	const defaultLayoutReversed = isHorizontal ? isRtlContext : false
	const isLayoutReversed = defaultLayoutReversed
	const isMotionReversed = reverse ?? false

	const flexDir = isHorizontal
		? isLayoutReversed
			? 'row-reverse'
			: 'row'
		: isLayoutReversed
			? 'column-reverse'
			: 'column'

	useEffect(() => {
		let controls
		const size = direction === 'horizontal' ? width : height
		const contentSize = size + gap
		const distance = contentSize / 2
		const baseFrom = isMotionReversed ? distance * -1 : 0
		const baseTo = isMotionReversed ? 0 : distance * -1
		const from = isLayoutReversed ? baseTo * -1 : baseFrom
		const to = isLayoutReversed ? baseFrom * -1 : baseTo

		const distanceToTravel = Math.abs(to - from)
		const duration = distanceToTravel / currentSpeed

		if (isTransitioning) {
			const remainingDistance = Math.abs(translation.get() - to)
			const transitionDuration = remainingDistance / currentSpeed

			controls = animate(translation, [translation.get(), to], {
				ease: 'linear',
				duration: transitionDuration,
				onComplete: () => {
					setIsTransitioning(false)
					setKey((prevKey) => prevKey + 1)
				},
			})
		} else {
			controls = animate(translation, [from, to], {
				ease: 'linear',
				duration: duration,
				repeat: Infinity,
				repeatType: 'loop',
				repeatDelay: 0,
				onRepeat: () => {
					translation.set(from)
				},
			})
		}
		return controls?.stop
	}, [
		key,
		translation,
		currentSpeed,
		width,
		height,
		gap,
		isTransitioning,
		direction,
		reverse,
		isMotionReversed,
	])

	const hoverProps = speedOnHover
		? {
				onHoverStart: () => {
					setIsTransitioning(true)
					setCurrentSpeed(speedOnHover)
				},
				onHoverEnd: () => {
					setIsTransitioning(true)
					setCurrentSpeed(speed)
				},
			}
		: {}

	return (
		<div className={cn('overflow-hidden', className)}>
			<m.div
				dir={dir}
				className="flex w-max"
				style={{
					...(direction === 'horizontal'
						? { x: translation }
						: { y: translation }),
					gap: `${gap}px`,
					flexDirection: flexDir,
				}}
				ref={ref}
				{...hoverProps}
			>
				{children}
				{children}
				{children}
				{children}
			</m.div>
		</div>
	)
}
