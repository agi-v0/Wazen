'use client'

import { useEffect, useRef } from 'react'
import useScrollPosition from '@/hooks/useScrollPosition'
import { useMediaQuery } from '@/hooks/use-media-query'

import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'

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
	const ref = useRef<HTMLDivElement>(null)
	const scrollPosition = useScrollPosition()
	const isDesktop = useMediaQuery('(min-width: 1280px)')

	useEffect(() => {
		const headerHeight = ref.current?.offsetHeight || 0
		const contactBarHeight = isDesktop ? 36 : 0
		const adjustedHeight =
			scrollPosition > 1 ? headerHeight - contactBarHeight : headerHeight
		document.documentElement.style.setProperty(
			'--header-height',
			adjustedHeight + 'px',
		)
	}, [isDesktop, scrollPosition])

	return (
		<div
			ref={ref}
			className={cn(
				className,
				'transition-transform duration-200 ease-in-out',
				scrollPosition > 1 && 'xl:-translate-y-9',
			)}
		>
			{isDesktop && <ContactBar contactInfo={contactInfo} locale={locale} />}
			{children}
		</div>
	)
}
