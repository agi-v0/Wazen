import InteractiveDetails from './InteractiveDetails'
import CTA from '@/ui/CTA'
import { PiCaretRight } from 'react-icons/pi'

export default function LinkList({ label, links }: Sanity.LinkList) {
	return (
		<InteractiveDetails
			className="group relative hover:bg-[#F9FAFB] hover:text-teal-600"
			closeAfterNavigate
		>
			<summary className="link flex h-8 items-center gap-1 rounded px-3 no-underline">
				{label}
				<PiCaretRight className="transition-transform group-open:rotate-90 md:rotate-90" />
			</summary>

			<ul className="anim-fade-to-b left-0 top-full border p-2 md:absolute md:min-w-max md:bg-canvas/90 md:backdrop-blur">
				{links?.map((link, key) => (
					<li key={key}>
						<CTA className="link" link={link} />
					</li>
				))}
			</ul>
		</InteractiveDetails>
	)
}
