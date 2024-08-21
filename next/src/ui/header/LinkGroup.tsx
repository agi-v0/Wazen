import InteractiveDetails from './InteractiveDetails'
import { PiCaretRightBold } from 'react-icons/pi'
import dynamic from 'next/dynamic'
import * as React from 'react'
import { cn } from '@/lib/utils'
import processUrl from '@/lib/processUrl'
import { Link } from '@/i18n/navigations'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
	NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
// import Link from 'next/link'

export default function LinkGroup({ label, links, locale }: Sanity.LinkGroup) {
	const linkCount = links?.[0]?.links && links?.[0].links.length

	return (
		<NavigationMenuItem key={label} className="w-full">
			<NavigationMenuTrigger className="group relative">
				{label}
			</NavigationMenuTrigger>
			<NavigationMenuContent className="max-lg:w-full">
				<ul
					className={cn(
						'grid gap-1 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]',
						linkCount && linkCount < 6 ? 'md:grid-cols-1' : '',
					)}
				>
					{links?.[0].links?.map((item: any) => (
						<NavigationMenuItem key={item.label}>
							<Link
								locale={locale as 'en' | 'ar'}
								href={processUrl(item.internal, {
									base: false,
									params: item.params,
								})}
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
			</NavigationMenuContent>
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
