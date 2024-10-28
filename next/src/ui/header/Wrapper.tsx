'use client'

import { useEffect, useRef } from 'react'
import useScrollPosition from '@/hooks/useScrollPosition'
import { useMediaQuery } from '@/hooks/use-media-query'
import ContactBar from './ContactBar'

export default function Wrapper({
	className,
	children,
	contactInfo,
	locale,
	pathname,
}: {
	contactInfo: any
	locale: string
	pathname: any
} & React.HTMLAttributes<HTMLDivElement>) {
	const ref = useRef<HTMLDivElement>(null)

	// set --header-height
	useEffect(() => {
		if (typeof window === 'undefined') return

		function setHeight() {
			if (!ref.current) return
			document.documentElement.style.setProperty(
				'--header-height',
				`${ref.current.offsetHeight ?? 0}px`,
			)
		}
		setHeight()
		window.addEventListener('resize', setHeight)

		return () => window.removeEventListener('resize', setHeight)
	}, [])

	// close mobile menu after navigation
	useEffect(() => {
		if (typeof document === 'undefined') return
		const toggle = document.querySelector('#header-open') as HTMLInputElement
		if (toggle) toggle.checked = false
	}, [pathname])
	const scrollPosition = useScrollPosition()
	const isDesktop = useMediaQuery('(min-width: 1280px)')

	return (
		<div
			ref={ref}
			className={
				className +
				` transition-transform duration-200 ease-in-out ${scrollPosition > 0 ? 'xl:-translate-y-9' : ''}`
			}
		>
			{isDesktop && <ContactBar contactInfo={contactInfo} locale={locale} />}
			{children}
		</div>
	)
}
