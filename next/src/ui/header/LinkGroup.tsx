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
import { NavigationMenuSub } from '@radix-ui/react-navigation-menu'
import Link from 'next/link'

export default function LinkGroup({ label, links, locale }: Sanity.LinkGroup) {
	return (
		<NavigationMenuItem key={label}>
			<NavigationMenuTrigger>{label}</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
					{links?.[0].links?.map((link: any) => (
						<Link
							href={
								locale +
								processUrl(link.internal, {
									base: false,
									params: link.params,
								})
							}
							key={link.label}
						>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								{link.label || link.internal.title}
							</NavigationMenuLink>
							{/* <PiCaretLeftBold className="size-3 text-teal-500/50 opacity-0 transition-transform group-hover:-translate-x-1 group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1" /> */}
						</Link>
					))}
				</ul>
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
