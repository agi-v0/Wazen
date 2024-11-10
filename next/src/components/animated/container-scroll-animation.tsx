'use client'
import React, { useRef } from 'react'
import {
	useScroll,
	useTransform,
	m,
	MotionValue,
	LazyMotion,
} from 'framer-motion'

export const ContainerScroll = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const containerRef = useRef<any>(null)
	const { scrollYProgress } = useScroll()
	// {
	// 	target: containerRef
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
			className="relative mx-auto flex w-[85%] items-center justify-center"
			ref={containerRef}
		>
			<div
				className="relative py-10 md:py-20"
				style={{
					perspective: '1000px',
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
	const loadFeatures = () => import('@/lib/features').then((res) => res.default)

	return (
		<LazyMotion features={loadFeatures}>
			<m.div
				style={{
					rotateX: rotate,
					scale,
				}}
				key={`container-scroll-${1}`}
			>
				<div className="h-full w-fit overflow-hidden rounded-xl bg-white/20 p-1 shadow-lg backdrop-blur-lg will-change-auto">
					{children}
				</div>
			</m.div>
		</LazyMotion>
	)
}
