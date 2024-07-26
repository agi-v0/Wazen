import { getSite } from '@/lib/sanity/queries'
import CTA from '@/ui/CTA'
import LinkList from './LinkList'
import LinkGroup from './LinkGroup'
import Link from 'next/link'

export default async function Menu({
	locale,
	headerMenu,
}: {
	locale: string
	headerMenu: Sanity.Navigation
}) {
	return (
		<nav className="max-md:anim-fade-to-r flex gap-x-0 max-lg:my-4 max-lg:flex-col max-lg:header-closed:hidden">
			{headerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return (
							<CTA
								className="flex h-8 items-center rounded-md px-3 font-medium text-cyan-950/80 no-underline transition-all hover:bg-teal-50 hover:text-cyan-700"
								link={item}
								locale={locale}
								key={key}
							/>
						)

					case 'link.list':
						return <LinkList {...item} key={key} locale={locale} />

					case 'link.group':
						return <LinkGroup {...item} key={key} locale={locale} />

					default:
						return null
				}
			})}
		</nav>
	)
}
