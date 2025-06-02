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
				'flex size-10 items-center justify-center rounded-full p-2 text-cyan-950 transition-colors data-[open=true]:bg-gray-100 lg:hidden',
				className,
			)}
			data-open={isOpen}
			aria-label={isOpen ? 'Close menu' : 'Open menu'}
		>
			<Icon
				icon={isOpen ? 'ph:x' : 'ph:list'}
				className="text-xl text-cyan-950"
			/>
		</button>
	)
}
