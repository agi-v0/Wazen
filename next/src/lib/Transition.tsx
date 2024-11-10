'use client'

import { LazyMotion, m } from 'framer-motion'

export default function Transition({
	children,
}: {
	children: React.ReactNode
}) {
	const loadFeatures = () => import('@/lib/features').then((res) => res.default)

	return (
		<LazyMotion features={loadFeatures}>
			<m.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ ease: 'easeInOut', duration: 0.3 }}
			>
				{children}
			</m.div>
		</LazyMotion>
	)
}
