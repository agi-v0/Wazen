'use client'

import { useEffect, useRef, useCallback } from 'react'
import useScrollPosition from '@/hooks/useScrollPosition'
import { useMediaQuery } from '@/hooks/use-media-query'
// import ContactBar from './ContactBar'

import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'

const ContactBar = dynamic(() => import('./ContactBar'), { ssr: true })
export default function Wrapper({
	className,
	children,
	contactInfo,
	locale,
	pathname,
}: {
	contactInfo: any
	locale: 'en' | 'ar'
	pathname: string
} & React.HTMLAttributes<HTMLDivElement>) {
	const ref = useRef<HTMLDivElement>(null)

	// Memoize setHeight function
	const setHeight = useCallback(() => {
		if (!ref.current) return
		const height = `${ref.current.offsetHeight}px`
		if (
			document.documentElement.style.getPropertyValue('--header-height') !==
			height
		) {
			document.documentElement.style.setProperty('--header-height', height)
		}
	}, [])

	// set --header-height
	useEffect(() => {
		setHeight()
		window.addEventListener('resize', setHeight)
		return () => window.removeEventListener('resize', setHeight)
	}, [setHeight])

	// close mobile menu after navigation
	useEffect(() => {
		const toggle = document.querySelector('#header-open') as HTMLInputElement
		if (toggle) toggle.checked = false
	}, [pathname])

	const scrollPosition = useScrollPosition()
	const isDesktop = useMediaQuery('(min-width: 1280px)')

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
