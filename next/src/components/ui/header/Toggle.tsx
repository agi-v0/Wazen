import { cn } from '@/lib/utils'
import { Icon } from '@iconify-icon/react'

export default function Toggle(
	className: React.HTMLAttributes<HTMLLabelElement>,
) {
	return (
		<label className={cn('size-10 p-2 text-cyan-950 lg:hidden', className)}>
			<input id="header-open" type="checkbox" hidden />
			<span className="h-full w-full header-closed:hidden">
				<Icon icon="ph:x" className="text-2xl text-cyan-950" />
			</span>
			<span className="hidden h-full w-full header-closed:block">
				<Icon icon="ph:list" className="text-2xl text-cyan-950" />
			</span>
		</label>
	)
}
