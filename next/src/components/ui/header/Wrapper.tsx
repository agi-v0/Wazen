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
		if (isDesktop) {
			document.documentElement.style.setProperty(
				'--header-height',
				ref.current?.offsetHeight + 'px',
			)
		} else {
			document.documentElement.style.setProperty(
				'--header-height',
				ref.current?.offsetHeight + 'px',
			)
		}
	}, [isDesktop])

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
