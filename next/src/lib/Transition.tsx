'use client'

import { LazyMotion } from 'motion/react'
import * as m from 'motion/react-m'

export default function Transition({
	children,
}: {
	children: React.ReactNode
}) {
	const loadFeatures = () => import('@/lib/domMax').then((res) => res.default)

	return (
		<LazyMotion features={loadFeatures}>
			{/* <m.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ ease: 'easeInOut', duration: 0.3 }}
			> */}
			{children}
			{/* </m.div> */}
		</LazyMotion>
	)
}
