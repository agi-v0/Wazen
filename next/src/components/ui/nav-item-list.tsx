import CTA from '@/ui/CTA'
import { PiCaretLeftBold } from '@/ui/Icons'

export default function NavItemList({ label, links, locale }: Sanity.LinkList) {
	return (
		<div>
			<summary className="text-small flex h-8 items-center px-3 uppercase text-gray-500 no-underline">
				{label}
			</summary>

			<ul className="grid grid-flow-col grid-rows-9 gap-x-4">
				{links?.map((link, key) => (
					<li
						key={key}
						className="group relative flex h-9 w-full items-center rounded-md px-3 font-medium text-cyan-950/80 hover:bg-teal-50"
					>
						<CTA
							link={link}
							locale={locale}
							className="no-underline group-hover:text-teal-600"
						/>
						<PiCaretLeftBold className="size-3 text-teal-500/50 opacity-0 transition-transform group-hover:-translate-x-1 group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1" />
					</li>
				))}
			</ul>
		</div>
	)
}
