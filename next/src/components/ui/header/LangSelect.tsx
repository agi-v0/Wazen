import { useLocale } from 'next-intl'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
// import Link from 'next/link'
import { Link } from '@/i18n/routing'
import { PiGlobe } from '@/components/ui/Icons'
import { cn } from '@/lib/utils'

const LangSelect = ({ pathname }: any) => {
	const locale = useLocale()
	return (
		<NavigationMenu
			dir={locale === 'en' ? 'ltr' : 'rtl'}
			className="z-0 flex-none"
		>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="group flex flex-row items-center justify-center gap-1">
						<PiGlobe className="size-4" />
						{locale == 'ar' ? 'AR' : 'EN'}
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className={cn('grid gap-1 p-4')}>
							<NavigationMenuItem>
								{/* <button
										onClick={() => onSelectChange('ar')}
										className={navigationMenuTriggerStyle()}
									>
										عربي
									</button> */}
								<Link
									locale="ar"
									href={pathname || '/'}
									legacyBehavior
									passHref
								>
									<NavigationMenuLink
										className={cn(
											navigationMenuTriggerStyle(),
											'min-w-fit text-nowrap',
										)}
									>
										عربي
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<Link
									locale="en"
									href={pathname || '/'}
									legacyBehavior
									passHref
								>
									<NavigationMenuLink
										className={cn(
											navigationMenuTriggerStyle(),
											'min-w-fit text-nowrap',
										)}
									>
										English
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

export default LangSelect
