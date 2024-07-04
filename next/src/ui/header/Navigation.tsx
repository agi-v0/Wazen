import { getSite } from '@/lib/sanity/queries'
import CTA from '@/ui/CTA'
import LinkList from './LinkList'
import LinkGroup from './LinkGroup'
import Link from 'next/link'

export default async function Menu({ locale }: any) {
	const { headerMenu } = await getSite()

	return (
		<nav className="max-md:anim-fade-to-r flex gap-x-0 max-md:my-4 max-md:flex-col max-md:header-closed:hidden">
			{headerMenu?.items?.map((item, key) => {

				switch (item._type) {
					case 'link':
						return (
							// <CTA
							// 	className="flex h-8 items-center rounded px-3 no-underline hover:bg-gray-500/5 hover:text-teal-600"
							// 	link={item}
							// 	key={key}
							// />

							<Link
								className="flex h-8 items-center rounded px-3 no-underline hover:bg-gray-500/5 hover:text-teal-600"
								href={`/${locale}/${item.internal?.metadata?.slug.current}`}
								key={key}
							>
								{item.label}
							</Link>
						)

					case 'link.list':
						return <LinkList {...item} key={key} />

					case 'link.group':
						return <LinkGroup {...item} key={key} />

					default:
						return null
				}
			})}
		</nav>
	)
}
