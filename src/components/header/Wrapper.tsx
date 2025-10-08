'use client'

import { useEffect, useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'

import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { useScroll } from 'motion/react'

const ContactBar = dynamic(() => import('./Desktop/ContactBar'), { ssr: true })
export default function Wrapper({
	className,
	children,
	contactInfo,
	locale,
}: {
	contactInfo: any
	locale: 'en' | 'ar'
} & React.HTMLAttributes<HTMLDivElement>) {
	const { scrollY } = useScroll()
	const [scrollPosition, setScrollPosition] = useState(0)
	const isDesktop = useMediaQuery('(min-width: 1280px)')

	useEffect(() => {
		const headerHeight = 0
		const contactBarHeight = isDesktop ? 36 : 0
		const adjustedHeight =
			scrollPosition > 1 ? headerHeight - contactBarHeight : headerHeight
		document.documentElement.style.setProperty(
			'--header-height',
			adjustedHeight + 'px',
		)
	}, [isDesktop, scrollPosition])

	scrollY.on('change', (latest) => {
		setScrollPosition(latest)
	})

	return (
		<div
			className={cn(
				className,
				'transition-transform duration-200 ease-in-out',
				scrollPosition > 1 && 'shadow-xs xl:-translate-y-9',
			)}
		>
			{isDesktop && <ContactBar contactInfo={contactInfo} locale={locale} />}
			{children}
		</div>
	)
}
