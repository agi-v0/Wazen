import InteractiveDetails from './InteractiveDetails'
import { PiCaretRightBold } from 'react-icons/pi'
import NavItemList from '@/components/nav-item-list'
import LinkList from './LinkList'

export default function LinkGroup({ label, links, locale }: Sanity.LinkGroup) {
	return (
		<InteractiveDetails className="relative" closeAfterNavigate>
			<summary className="group relative flex h-8 items-center gap-1 rounded px-3 no-underline transition-all hover:text-cyan-700">
				{label}
				<PiCaretRightBold className="size-3 translate-y-0 text-gray-500/50 transition-transform group-open:rotate-90 group-hover:translate-y-[2px] md:rotate-90" />
			</summary>

			<ul className="anim-fade-to-b start-0 top-full flex flex-col gap-10 rounded-lg border border-gray-100 bg-white p-3 shadow-md md:absolute md:max-h-[340px] md:min-w-max md:flex-row md:backdrop-blur">
				{links?.map((label: any, key: any) => (
					<NavItemList {...label} key={key} locale={locale} />
				))}
			</ul>
		</InteractiveDetails>
	)
}
