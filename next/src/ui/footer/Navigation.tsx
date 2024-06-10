import Link from 'next/link'
import { PiCaretDownBold } from 'react-icons/pi'

export default async function Menu({ footerMenu }: any) {
	return (
		<nav className="flex w-full flex-col flex-wrap items-start justify-start gap-8 md:flex-row md:justify-around">
			{footerMenu?.items?.map((item: any, key: any) => {
				const { label, links } = item

				return (
					<div key={key} className="cursor-default md:w-1/3 lg:w-fit">
						<div className="mb-4 rounded text-start font-medium text-teal-50">
							{label}
						</div>

						<ul className="text-start">
							{links?.map((link: any, key: any) => (
								<li
									key={key}
									className="group flex h-8 items-center text-teal-50/80"
								>
									<Link
										href=""
										className="no-underline group-hover:text-teal-100"
									>
										{link.label}
									</Link>
									<PiCaretDownBold className="size-3 translate-x-0 text-gray-50/50 opacity-0 transition-transform duration-300 group-hover:-translate-x-[4px] group-hover:opacity-100 md:rotate-90" />
								</li>
							))}
						</ul>
					</div>
				)
			})}
		</nav>
	)
}
