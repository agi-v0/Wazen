'use client'

import { useEffect, useRef, useCallback } from 'react'
import useScrollPosition from '@/hooks/useScrollPosition'
import { useMediaQuery } from '@/hooks/use-media-query'
// import ContactBar from './ContactBar'

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

	// Memoize setHeight function
	const setHeight = useCallback(() => {
		if (!ref.current) return
		const contactBarHeight = isDesktop && scrollPosition <= 1 ? 0 : 36 // subtract 36px (h-9 * 4) when ContactBar is hidden
		const height = `${ref.current.offsetHeight - contactBarHeight}px`
		if (
			document.documentElement.style.getPropertyValue('--header-height') !==
			height
		) {
			document.documentElement.style.setProperty('--header-height', height)
		}
	}, [isDesktop, scrollPosition])

	// set --header-height
	useEffect(() => {
		setHeight()
		window.addEventListener('resize', setHeight)
		return () => window.removeEventListener('resize', setHeight)
	}, [setHeight])

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
