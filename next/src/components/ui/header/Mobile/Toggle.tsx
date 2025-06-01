import { cn } from '@/lib/utils'
import { Icon } from '@iconify-icon/react'

interface ToggleProps {
	isOpen: boolean
	onToggle: () => void
	className?: string
}

export default function Toggle({ isOpen, onToggle, className }: ToggleProps) {
	return (
		<button
			onClick={onToggle}
			className={cn(
				'flex size-10 items-center justify-center p-2 text-cyan-950 lg:hidden',
				className,
			)}
			aria-label={isOpen ? 'Close menu' : 'Open menu'}
		>
			<Icon
				icon={isOpen ? 'ph:x' : 'ph:list'}
				className="text-2xl text-cyan-950"
			/>
		</button>
	)
}
