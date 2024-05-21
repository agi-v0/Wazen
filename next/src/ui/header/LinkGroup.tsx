import InteractiveDetails from './InteractiveDetails'
import { PiCaretRight } from 'react-icons/pi'
import NavItemList from '@/components/nav-item-list'

export default function LinkGroup({ label, links }: Sanity.LinkGroup) {
	return (
		<InteractiveDetails className="group relative" closeAfterNavigate>
			<summary className="group relative flex h-8 items-center gap-1 rounded px-3 no-underline hover:bg-[#F9FAFB] hover:text-teal-600">
				{label}
				<PiCaretRight className="transition-transform group-open:rotate-90 md:rotate-90" />
			</summary>

			<ul className="anim-fade-to-b start-0 top-full flex border bg-white p-2 md:absolute md:min-w-max md:backdrop-blur">
				{links?.map((item, key) => <NavItemList {...item} key={key} />)}
			</ul>
		</InteractiveDetails>
	)
}
