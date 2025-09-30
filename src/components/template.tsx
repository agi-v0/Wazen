'use client'

import { m } from 'motion/react'

export default function Template({ children }: { children: React.ReactNode }) {
	return (
		<m.div
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ ease: 'easeInOut', duration: 0.15 }}
		>
			{children}
		</m.div>
	)
}
