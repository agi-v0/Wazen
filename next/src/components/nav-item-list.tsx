import CTA from '@/ui/CTA'

function NavItemList({ label, links }: Sanity.LinkGroup) {
	return (
		<div className="flex min-w-40 flex-col">
			<summary className="flex h-8 items-center font-semibold no-underline">
				{label}
			</summary>

			<ul className="left-0 top-full w-40">
				{links?.map((link, key) => (
					<li key={key} className="h-8">
						<CTA className="link" link={link} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default NavItemList
