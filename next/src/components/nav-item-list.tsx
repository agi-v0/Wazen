import CTA from '@/ui/CTA'
import { PiCaretLeftBold } from 'react-icons/pi'

function NavItemList({ label, links }: Sanity.LinkList) {
	return (
		<div>
			<summary className="flex h-8 items-center font-semibold no-underline">
				{label}
			</summary>

			<ul className="grid grid-flow-col grid-rows-9 gap-x-4">
				{links?.map((link, key) => (
					<li
						key={key}
						className="group relative flex h-9 items-center rounded px-3 text-gray-600 hover:bg-gray-50"
					>
						<CTA
							link={link}
							className="no-underline group-hover:text-teal-600"
						/>
						<PiCaretLeftBold className="size-3 text-teal-500/50 opacity-0 transition-transform group-hover:-translate-x-1 group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1" />
					</li>
				))}
			</ul>
		</div>
	)
}

export default NavItemList
