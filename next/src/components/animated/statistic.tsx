import React from 'react'
import { motion } from 'framer-motion'

const Statistic = () => {
	return (
		<div className="flex h-full items-center justify-center gap-4">
			<motion.img
				src="/statistic-img-2.svg"
				alt="statistic"
				initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
				animate={{ opacity: 1, scale: 1, rotate: 12 }}
				transition={{
					duration: 4,
					repeat: Infinity,
					repeatType: 'reverse',
				}}
				className="max-w-[200px]"
			/>
			<motion.img
				src="/statistic-img-1.svg"
				alt="statistic"
				initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
				animate={{ opacity: 1, scale: 1, rotate: -10 }}
				transition={{
					duration: 4,
					delay: 1,
					repeat: Infinity,
					repeatType: 'reverse',
				}}
				className="max-w-[200px] mt-20"
			/>
		</div>
	)
}

export default Statistic
