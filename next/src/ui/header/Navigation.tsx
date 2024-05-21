import { getSite } from '@/lib/sanity/queries'
import CTA from '@/ui/CTA'
import LinkList from './LinkList'
import LinkGroup from './LinkGroup'

export default async function Menu() {
	const { headerMenu } = await getSite()

	return (
		<nav className="max-md:anim-fade-to-r flex items-center gap-x-4 max-md:my-4 max-md:flex-col max-md:header-closed:hidden">
			{headerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return (
							<CTA
								className="link p-2 no-underline hover:bg-gray-50 hover:text-teal-600"
								link={item}
								key={key}
							/>
						)

					case 'link.list':
						return <LinkList {...item} key={key} />
						
						case 'link.group':
						return <LinkGroup  {...item} key={key} />

					default:
						return null
				}
			})}
		</nav>
	)
}
