import { cn } from '@/lib/utils'
import { PiList, PiX } from 'react-icons/pi'

export default function Toggle(
	className: React.HTMLAttributes<HTMLLabelElement>,
) {
	return (
		<label className={cn('p-2 text-cyan-950 lg:hidden', className)}>
			<input id="header-open" type="checkbox" hidden />
			<span className="header-closed:hidden">
				<PiX className="h-5 w-5" />
			</span>
			<span className="hidden header-closed:block">
				<PiList className="h-5 w-5" />
			</span>
		</label>
	)
}
