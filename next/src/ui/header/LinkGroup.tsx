import InteractiveDetails from './InteractiveDetails'
import { PiCaretRightBold } from 'react-icons/pi'
import NavItemList from '@/components/ui/nav-item-list'
import LinkList from './LinkList'

export default function LinkGroup({ label, links, locale }: Sanity.LinkGroup) {
	return (
		<InteractiveDetails className="relative" closeAfterNavigate>
			<summary className="group relative flex h-8 items-center gap-1 rounded-md px-3 font-medium text-cyan-950/80 no-underline transition-all hover:bg-teal-50 hover:text-cyan-700">
				{label}
				<PiCaretRightBold className="size-3 translate-y-0 text-cyan-950/50 transition-transform group-open:rotate-90 group-hover:translate-y-[2px] group-hover:text-cyan-700/50 md:rotate-90" />
			</summary>

			<ul className="anim-fade-to-b start-0 top-full flex flex-col gap-10 rounded-lg border border-gray-100 bg-white p-3 shadow-md md:absolute md:max-h-[400px] md:min-w-max md:flex-row md:backdrop-blur">
				{links
					?.slice(0, 2)
					.map((label: any, key: any) => (
						<NavItemList {...label} key={key} locale={locale} />
					))}
			</ul>
		</InteractiveDetails>
	)
}
