import LinkList from './LinkList'
import LinkGroup from './LinkGroup'
import processUrl from '@/lib/processUrl'

import * as React from 'react'
import { Link } from '@/i18n/routing'

import { cn } from '@/lib/utils'
import {
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Icon } from '@iconify-icon/react'

export async function Navigation({
	headerMenu,
	locale,
}: {
	headerMenu: Sanity.Navigation
	locale: 'en' | 'ar'
}) {
	// const { headerMenu } = await getSite(locale)
	return (
		<NavigationMenuList className="max-lg:w-full max-lg:flex-auto">
			{headerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return (
							<NavigationMenuItem key={key} className="w-full">
								{item.internal && (
									<Link
										locale={locale as 'en' | 'ar'}
										href={processUrl(item.internal, {
											base: false,
											params: item.params,
										})}
										className={cn(
											navigationMenuTriggerStyle(),
											'min-w-fit text-nowrap',
										)}
									>
										{item.label || item.internal.title}
									</Link>
								)}
							</NavigationMenuItem>
						)

					case 'link.list':
						return <LinkList {...item} key={key} locale={locale} />

					case 'link.group':
						return <LinkGroup {...item} key={key} locale={locale} />

					default:
						return null
				}
			})}
		</NavigationMenuList>
	)
}

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = 'ListItem'

// export default async function OldMenu({ locale }: any) {
// 	const { headerMenu } = await getSite(locale)
// 	return (
// 		<NavigationMenu className="max-md:anim-fade-to-r flex gap-x-0 max-lg:my-4 max-lg:flex-col max-lg:header-closed:hidden">
// 			{headerMenu?.items?.map((item, key) => {
// 				switch (item._type) {
// 					case 'link':
// 						return (
// 							<CTA
// 								className="flex h-8 items-center rounded-md px-3 font-medium text-cyan-950/80 no-underline transition-all hover:bg-teal-50 hover:text-cyan-700"
// 								link={item}
// 								locale={locale}
// 								key={key}
// 							/>
// 						)

// 					case 'link.list':
// 						return <LinkList {...item} key={key} locale={locale} />

// 					case 'link.group':
// 						return <LinkGroup {...item} key={key} locale={locale} />

// 					default:
// 						return null
// 				}
// 			})}
// 		</NavigationMenu>
// 	)
// }
