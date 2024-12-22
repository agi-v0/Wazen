import * as React from 'react'
import { cn } from '@/lib/utils'
import processUrl from '@/lib/processUrl'
import { Link } from '@/i18n/routing'
import {
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Icon } from '@iconify/react/dist/iconify.js'

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
						'grid gap-1 p-4 md:w-[400px] md:grid-cols-2 md:gap-y-0 lg:w-[500px]',
						linkCount && linkCount < 6 ? 'md:grid-cols-1' : '',
					)}
				>
					{links?.[0].links?.map((item: any) => (
						<NavigationMenuItem key={item.label}>
							<Link
								locale={locale as 'en' | 'ar'}
								href={
									item.type === 'internal'
										? processUrl(item.internal, {
												base: false,
												params: item.params,
											})
										: item.external
								}
								legacyBehavior
								passHref
							>
								<NavigationMenuLink
									className={cn(
										navigationMenuTriggerStyle(),
										item.iconify?.name && 'h-12 px-2',
									)}
								>
									{item.iconify?.name && (
										<div className="-absolute -start-0 me-2 rounded-md bg-teal-50 p-1 transition-colors duration-200 group-hover:bg-cyan-800">
											<Icon
												icon={item.iconify.name}
												className="size-6 text-teal-600 group-hover:text-teal-50"
											/>
										</div>
									)}
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
