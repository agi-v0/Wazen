'use client'
import React, { useRef } from 'react'
import { useScroll, useTransform, MotionValue } from 'motion/react'
import * as m from 'motion/react-m'

export const ContainerScroll = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const containerRef = useRef<any>(null)
	const [isMobile, setIsMobile] = React.useState(false)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: isMobile
			? ['start end', 'start center']
			: ['start end', 'start start'],
	})

	React.useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => {
			window.removeEventListener('resize', checkMobile)
		}
	}, [])

	const scaleDimensions = () => {
		return isMobile ? [0.9, 1] : [1.05, 1]
	}

	const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
	const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
	const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

	return (
		<div
			className="relative mx-auto flex items-center justify-center lg:w-[85%]"
			ref={containerRef}
		>
			<div
				// className="relative py-10 md:py-20"
				style={{
					perspective: '1000px',
					width: '100%',
					position: 'relative',
					paddingTop: 'clamp(2.5rem, 5.263vw + 2.5rem, 5rem)',
					paddingBottom: 'clamp(2.5rem, 5.263vw + 2.5rem, 5rem)',
				}}
			>
				<Card rotate={rotate} translate={translate} scale={scale}>
					{children}
				</Card>
			</div>
		</div>
	)
}

export const Card = ({
	rotate,
	scale,
	children,
}: {
	rotate: MotionValue<number>
	scale: MotionValue<number>
	translate: MotionValue<number>
	children: React.ReactNode
}) => {
	return (
		<m.div
			style={
				{
					rotateX: rotate,
					scale,
				} as any
			}
			key={`container-scroll-${1}`}
		>
			<div className="h-auto w-full overflow-hidden rounded-xl bg-white/20 p-1 shadow-lg backdrop-blur-lg will-change-auto">
				{children}
			</div>
		</m.div>
	)
}
