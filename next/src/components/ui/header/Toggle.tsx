import { cn } from '@/lib/utils'
import { Icon } from '@iconify-icon/react'

export default function Toggle(
	className: React.HTMLAttributes<HTMLLabelElement>,
) {
	return (
		<label className={cn('p-2 text-cyan-950 lg:hidden', className)}>
			<input id="header-open" type="checkbox" hidden />
			<span className="header-closed:hidden">
				<Icon icon="ph:x" className="h-5 w-5 text-cyan-950" />
			</span>
			<span className="hidden header-closed:block">
				<Icon icon="ph:list" className="h-5 w-5 text-cyan-950" />
			</span>
		</label>
	)
}
