import CTA from '@/ui/CTA'

function NavItemList({ label, links }: Sanity.LinkGroup) {
	return (
		<div>
			<summary className="flex h-8 items-center gap-1 rounded px-3 font-bold no-underline">
				{label}
			</summary>

			<ul className="left-0 top-full p-2 md:min-w-max">
				{links?.map((link, key) => (
					<li key={key} className="py-1">
						<CTA className="link" link={link} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default NavItemList
