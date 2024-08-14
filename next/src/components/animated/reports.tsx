import React from 'react'
import { motion } from 'framer-motion'

const reports = () => {
	return (
		<div className="flex h-full flex-row-reverse items-center justify-center gap-2">
			<motion.img
				src="/statistic-img-1.svg"
				alt="reports"
				initial={{ opacity: 0, scale: 0.75, rotate: 0, translateY: -5 }}
				animate={{ opacity: 1, scale: 1, rotate: -5, translateY: 0 }}
				transition={{
					duration: 1,
					delay: 0.3,

					type: 'bounce',
					repeat: Infinity,
					repeatDelay: 1.5,
				}}
				className="max-w-[200px] rounded-lg shadow-lg"
			/>
			<motion.img
				src="/statistic-img-2.svg"
				alt="reports"
				initial={{ opacity: 0, scale: 0.75, rotate: 0, translateY: -5 }}
				animate={{ opacity: 1, scale: 1, rotate: 5, translateY: 0 }}
				transition={{
					duration: 1,

					type: 'bounce',
					repeat: Infinity,
					repeatDelay: 1.5,
				}}
				className="max-w-[200px] rounded-lg shadow-lg"
			/>
		</div>
	)
}

export default reports
