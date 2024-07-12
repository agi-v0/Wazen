import CTA from '@/ui/CTA'

function NavItemList({ label, links }: Sanity.LinkList) {
	return (
		<div>
			<summary className="flex h-8 items-center font-semibold no-underline">
				{label}
			</summary>

			<ul className="grid grid-flow-col grid-rows-9 gap-x-4">
				{links?.map((link, key) => (
					<li key={key} className="h-8 text-gray-600">
						<CTA className="" link={link} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default NavItemList
