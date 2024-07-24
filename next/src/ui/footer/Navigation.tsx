import Link from 'next/link'
import CTA from '../CTA'
import { PiCaretLeftBold } from 'react-icons/pi'
import Image from 'next/image'

export default async function Menu({ footerMenu, locale }: any) {
	return (
		<nav className="flex w-full flex-col flex-wrap items-start justify-start gap-8 md:grid md:grid-cols-2 md:justify-around lg:grid-cols-5">
			<Link className="font-bold" href="/">
				<Image
					src="/wazen-logo-white.svg"
					alt="Logo"
					height={24}
					width={85.37}
				/>
			</Link>
			{footerMenu?.items?.map((item: any, key: any) => {
				const { label, links } = item
				return (
					<div key={key}>
						<div className="mb-4 h-9 rounded text-start text-white/50">
							{label}
						</div>
						<ul className="text-start">
							{links?.map((link: any, key: any) => (
								<li
									key={key}
									className="group flex items-center py-2 text-white/80"
								>
									<CTA
										locale={locale}
										link={link}
										className="no-underline group-hover:text-white"
									>
										{link.label}
									</CTA>
									<PiCaretLeftBold className="size-3 translate-x-0 text-gray-50/50 opacity-0 transition-transform duration-300 group-hover:-translate-x-1 group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1" />
								</li>
							))}
						</ul>
					</div>
				)
			})}
		</nav>
	)
}
