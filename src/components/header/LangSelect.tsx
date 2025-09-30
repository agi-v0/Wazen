'use client'
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
// import {Link} from '@/i18n/routing'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { useParams } from 'next/navigation'

import { Icon } from '@iconify-icon/react'
import { cn } from '@/lib/utils'
import { ChangeEvent, useTransition } from 'react'

const LangSelect = () => {
	const locale = useLocale()
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const pathname = usePathname()
	const params = useParams()

	function onSelectChange(locale: 'en' | 'ar') {
		const nextLocale = locale as 'en' | 'ar'
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: nextLocale },
			)
		})
	}
	return (
		<NavigationMenu
			dir={locale === 'en' ? 'ltr' : 'rtl'}
			className="z-0 flex-none"
		>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="group flex flex-row items-center justify-center">
						<Icon icon="ph:globe" className="me-1 text-base leading-none" />
						{locale == 'ar' ? 'AR' : 'EN'}
					</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className={cn('grid gap-1 p-4')}>
							<NavigationMenuItem>
								<button
									onClick={() => onSelectChange('ar')}
									className={navigationMenuTriggerStyle()}
								>
									عربي
								</button>
								{/* <Link
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
								</Link> */}
							</NavigationMenuItem>
							<NavigationMenuItem>
								<button
									onClick={() => onSelectChange('en')}
									className={navigationMenuTriggerStyle()}
								>
									English
								</button>
								{/* <Link
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
								</Link> */}
							</NavigationMenuItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

export default LangSelect
