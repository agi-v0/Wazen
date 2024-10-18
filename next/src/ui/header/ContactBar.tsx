import CTA from '../CTA'

export default function ContactBar({
	contactInfo,
}: Partial<{
	contactInfo: any
}>) {
	return (
		<div
			id="contactBar"
			className="flex h-9 w-full flex-row gap-8 bg-gray-50 px-3 py-2"
		>
			{contactInfo.map(
				(item: { link: Sanity.Link; title: any; _key: string }) => {
					return (
						<div key={item._key} className="text-sm text-gray-400">
							<CTA link={item.link} />
						</div>
					)
				},
			)}
		</div>
	)
}
