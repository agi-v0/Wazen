'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import ContactBar from './ContactBar'
import useScrollPosition from '@/hooks/useScrollPosition'
import { useMediaQuery } from '@/hooks/use-media-query'

export default function Wrapper({
	className,
	children,
	contactInfo,
	locale,
}: {
	contactInfo: any
	locale: string
} & React.HTMLAttributes<HTMLDivElement>) {
	const ref = useRef<HTMLDivElement>(null)
	const pathname = usePathname()

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
				` transition-transform duration-200 ease-in-out ${scrollPosition > 0 ? '-translate-y-9' : ''}`
			}
		>
			{isDesktop && <ContactBar contactInfo={contactInfo} locale={locale} />}
			{children}
		</div>
	)
}
