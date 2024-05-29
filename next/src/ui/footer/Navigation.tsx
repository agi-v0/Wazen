import { getSite } from '@/lib/sanity/queries'
import Link from 'next/link'

export default async function Menu() {
	const { footerMenu } = await getSite()

	return (
		<nav className="flex w-full flex-col flex-wrap items-start justify-start gap-8 md:flex-row md:justify-around">
			{footerMenu?.items?.map((item, key) => {
				const { label, links } = item

				return (
					<div key={key} className="cursor-default md:w-1/3 lg:w-fit ">
						<div className="mb-4 h-8 rounded text-start ">{label}</div>

						<ul className="text-start">
							{links?.map((link: any, key: any) => (
								<li key={key} className="h-8  text-white">
									<Link href="" className="no-underline hover:text-teal-600">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				)
			})}
		</nav>
	)
}
