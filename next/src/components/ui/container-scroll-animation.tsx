'use client'
import React, { useRef } from 'react'
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'

export const ContainerScroll = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const containerRef = useRef<any>(null)
	const { scrollYProgress } = useScroll()
	// 	{
	// 	target: containerRef,
	// }
	const [isMobile, setIsMobile] = React.useState(false)

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
		return isMobile ? [0.7, 0.9] : [1.05, 1]
	}

	const rotate = useTransform(scrollYProgress, [0, 0.1], [20, 0])
	const scale = useTransform(scrollYProgress, [0, 0.1], scaleDimensions())
	const translate = useTransform(scrollYProgress, [0, 0.1], [0, -100])

	return (
		<div
			className="relative flex items-center justify-center"
			ref={containerRef}
		>
			<div
				className="relative py-10 md:py-20"
				style={{
					perspective: '800px',
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
		<motion.div
			style={{
				rotateX: rotate,
				scale,
			}}
			key={`container-scroll-${1}`}
		>
			<div className="h-full w-full overflow-hidden rounded-xl border-4 border-teal-500/20 shadow-lg">
				{children}
			</div>
		</motion.div>
	)
}
