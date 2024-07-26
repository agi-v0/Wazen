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

export default function LinkList({ label, links, locale }: Sanity.LinkList) {
	return (
		<NavigationMenuItem key={label}>
			<NavigationMenuTrigger className="group relative">
				{label}
				{/* <PiCaretRightBold className="size-3 translate-y-0 text-cyan-950/50 transition-transform duration-300 group-open:rotate-90 group-hover:translate-y-[2px] group-hover:text-cyan-700/50 md:rotate-90" /> */}
			</NavigationMenuTrigger>
			{/* <summary className="group flex h-8 items-center gap-1 rounded-md px-3 font-medium text-cyan-950/80 no-underline transition-all hover:bg-teal-50 hover:text-cyan-700"></summary> */}

			{/* //@ Style Doesn't work in This Component */}
			{/* {links && <NavItemMenu links={links} />} */}
			<NavigationMenuContent>
				{links && (
					<ul className="grid w-full gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
						{links?.[0] && (
							<li key={links?.[0].label} className="group row-span-3">
								<NavigationMenuLink asChild>
									<CTA
										link={links[0]}
										className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-cyan-800 to-cyan-950 p-6 no-underline outline-none transition-all focus:shadow-md"
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
									{/* <a
								className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
								href="/"
							>
								{/* <Icons.logo className="h-6 w-6" /> 
								<div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
								<p className="text-muted-foreground text-sm leading-tight">
									Beautifully designed components built with Radix UI and
									Tailwind CSS.
								</p>
							</a> */}
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
								className="group relative flex w-full flex-col p-3 transition-all hover:bg-teal-50"
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
