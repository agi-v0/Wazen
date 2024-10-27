import CTA from '../CTA'
import { PiEnvelope, PiMapPin, PiPhone } from '../Icons'

export default function ContactBar({
	contactInfo,
	locale,
}: Partial<{
	contactInfo: any
	locale: string
}>) {
	const icons = [
		<PiPhone key="PiPhone" className="size-4 text-cyan-950/60" />,
		<PiEnvelope key="PiEnvelope" className="size-4 text-cyan-950/60" />,
		<PiMapPin key="PiMapPin" className="size-4 text-cyan-950/60" />,
	]
	return (
		<div id="contactBar" className="h-9 w-full bg-gray-50">
			<div className="section flex flex-row justify-end gap-2 py-1">
				<span className="grow-1 w-full py-1 text-sm font-medium text-gray-500">
					{locale == 'ar' ? 'تواصل معنا' : 'Get in touch with us'}
				</span>
				{contactInfo?.map(
					(item: { link: Sanity.Link; title: any }, index: number) => {
						if (item.link.external)
							return (
								<div
									key={index}
									className="flex shrink-0 flex-row items-center gap-1 px-2 py-1 text-sm text-gray-400 *:hover:text-teal-600"
								>
									{icons[index]}
									<CTA link={item.link} />
								</div>
							)
					},
				)}
			</div>
		</div>
	)
}
