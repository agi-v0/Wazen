import InteractiveDetails from './InteractiveDetails'
import { PiCaretRightBold } from 'react-icons/pi'
import NavItemList from '@/components/ui/nav-item-list'
import dynamic from 'next/dynamic'
import * as React from 'react'
import { cn } from '@/lib/utils'
import processUrl from '@/lib/processUrl'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'

export default function LinkGroup({ label, links, locale }: Sanity.LinkGroup) {
	return (
		<NavigationMenuItem key={label}>
			<NavigationMenuTrigger>{label}</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ScrollArea
					className="max-md:h-[400px] max-md:w-full"
					dir={locale == 'en' ? 'ltr' : 'rtl'}
				>
					<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
						{links?.[0].links?.map((item: any) => (
							<NavigationMenuItem key={item.label}>
								<Link
									href={
										locale +
										processUrl(item.internal, {
											base: false,
											params: item.params,
										})
									}
									legacyBehavior
									passHref
								>
									<NavigationMenuLink className={navigationMenuTriggerStyle()}>
										{item.label || item.internal.title}
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						))}
					</ul>
				</ScrollArea>
			</NavigationMenuContent>

			{/* <ul className="anim-fade-to-b start-0 top-full flex flex-col gap-10 rounded-lg border border-gray-100 bg-white p-3 shadow-md md:absolute md:max-h-[400px] md:min-w-max md:flex-row md:backdrop-blur">
				{links
					?.slice(0, 2)
					.map((label: any, key: any) => (
						<NavItemList {...label} key={key} locale={locale} />
					))}
			</ul> */}
		</NavigationMenuItem>
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
