import InteractiveDetails from './InteractiveDetails'
import CTA from '@/ui/CTA'
import { PiCaretRightBold, PiCaretLeftBold } from 'react-icons/pi'
import processUrl from '@/lib/processUrl'
import Image from 'next/image'
import * as React from 'react'
import { cn } from '@/lib/utils'
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

export default function LinkList({ label, links, locale }: Sanity.LinkList) {
	return (
		<NavigationMenuItem key={label}>
			<NavigationMenuTrigger className="group relative">
				{label}
			</NavigationMenuTrigger>
			<NavigationMenuContent>
				<ScrollArea
					className="max-md:h-[500px] max-md:w-full"
					dir={locale == 'en' ? 'ltr' : 'rtl'}
				>
					{links && (
						<ul className="grid w-full gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							{links?.[0] && (
								<li key={links?.[0].label} className="group row-span-3">
									<NavigationMenuLink asChild>
										<CTA
											link={links[0]}
											className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-cyan-800 to-cyan-950 p-6 text-start no-underline outline-none transition-all focus:shadow-md"
										>
											<Image
												src={
													'https://cdn.sanity.io/images/m7bjawr3/production/c971f5dc58e26dc7798d2bcd6acdf067328abbb8-1440x1024.svg?w=540&fm=webp'
												}
												alt={links?.[0].label}
												width={250}
												height={250}
												className="h-auto w-full rounded-md"
												priority={true}
											/>
											<div className="mb-2 mt-4 flex flex-row items-center text-lg font-medium text-white group-hover:text-teal-500">
												{links?.[0].label}
												<PiCaretLeftBold className="size-3 text-white/50 opacity-0 transition-transform group-hover:-translate-x-1 group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1" />
											</div>
											<p className="text-sm leading-tight text-white/80 group-hover:text-white">
												{links?.[0].description}
											</p>
										</CTA>
									</NavigationMenuLink>
								</li>
							)}
							{links?.slice(1).map((link: any, key) => (
								<ListItem
									href={
										locale +
										processUrl(link.internal, {
											base: false,
											params: link.params,
										})
									}
									key={link.label}
									className="group relative flex w-full flex-col p-3 text-start transition-all hover:bg-teal-50"
								>
									<div className="flex flex-row items-center font-medium text-gray-950 group-hover:text-teal-600">
										{link.label}
										<PiCaretLeftBold className="size-3 text-teal-500/50 opacity-0 transition-transform group-hover:-translate-x-1 group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1" />
									</div>
									<p className="text-gray-600 group-hover:text-cyan-950">
										{link.description}
									</p>
								</ListItem>
							))}
						</ul>
					)}
				</ScrollArea>
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
