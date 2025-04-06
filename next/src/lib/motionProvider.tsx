'use client'

import { LazyMotion } from 'motion/react'

const loadFeatures = () =>
	import('@/lib/domAnimation').then((mod) => mod.default)

export default function Motion({ children }: { children: React.ReactNode }) {
	return (
		<LazyMotion features={loadFeatures} strict>
			{children}
		</LazyMotion>
	)
}
