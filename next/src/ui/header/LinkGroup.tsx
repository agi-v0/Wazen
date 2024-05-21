import InteractiveDetails from './InteractiveDetails'
import { PiCaretRightBold } from 'react-icons/pi'
import NavItemList from '@/components/nav-item-list'

export default function LinkGroup({ label, links }: Sanity.LinkGroup) {
	return (
		<InteractiveDetails className="group relative" closeAfterNavigate>
			<summary className="group relative flex h-8 items-center gap-1 rounded px-3 no-underline hover:bg-gray-500/5 hover:text-teal-600">
				{label}
				<PiCaretRightBold className="size-3 translate-y-0 text-gray-500/50 transition-transform group-open:rotate-90 group-hover:translate-y-[2px] md:rotate-90" />
			</summary>

			<ul className="anim-fade-to-b start-0 top-full flex gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-md md:absolute md:min-w-max md:backdrop-blur">
				{links?.map((item, key) => <NavItemList {...item} key={key} />)}
			</ul>
		</InteractiveDetails>
	)
}
