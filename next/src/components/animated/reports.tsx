import * as motion from 'framer-motion/client'

const REPORTS_ANIMATION_VARIANTS = {
	hidden: { opacity: 0, scale: 0.75, y: -20 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
	},
}
const slide = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
}

const reports = () => {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={{
				visible: {
					transition: {
						staggerChildren: 0.2,
					},
				},
			}}
			className="relative flex h-full max-w-md flex-row-reverse items-center gap-2"
		>
			<motion.img
				src="/statistic-img-1.svg"
				alt="reports"
				variants={{
					hidden: { opacity: 0, scale: 0.75, y: -20 },
					visible: {
						opacity: 1,
						scale: 1,
						y: 0,
					},
				}}
				transition={{
					repeat: Infinity,
					repeatType: 'mirror',
					repeatDelay: 1,
				}}
				className="h-auto w-full max-w-[50%] flex-shrink basis-1/2 rounded-lg shadow-lg"
				style={{ rotate: '-6deg' }} // {{ edit_1 }}
			/>
			<motion.img
				src="/statistic-img-2.svg"
				alt="reports"
				variants={{
					hidden: { opacity: 0, scale: 0.75, y: -20 },
					visible: {
						opacity: 1,
						scale: 1,
						y: 0,
					},
				}}
				transition={{ repeatType: 'mirror', repeat: Infinity, repeatDelay: 1 }}
				className="h-auto w-full max-w-[50%] flex-shrink basis-1/2 rounded-lg shadow-lg"
				style={{ rotate: '6deg' }} // {{ edit_2 }}
			/>
		</motion.div>
	)
}

export default reports
