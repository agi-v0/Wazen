'use client'

import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'
import { useRouter, usePathname } from '../../i18n/navigations'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Link } from '@/i18n/navigations'
import { PiCaretRightBold, PiGlobe } from 'react-icons/pi'
import InteractiveDetails from '@/ui/header/InteractiveDetails'
import { cn } from '@/lib/utils'

const LangSelect = () => {
	const locale = useLocale()

	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const pathname = usePathname()
	const params = useParams()

	function onSelectChange(lang: string) {
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: lang },
			)
		})
	}

	return (
		<>
			<NavigationMenu
				dir={locale == 'en' ? 'ltr' : 'rtl'}
				className="z-0 flex-none"
			>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger className="group flex flex-row items-center justify-center gap-1">
							<PiGlobe />
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
									<Link locale={'ar'} href={pathname} legacyBehavior passHref>
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
									<Link locale={'en'} href={pathname} legacyBehavior passHref>
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

						{/* <ul className="anim-fade-to-b start-0 top-full flex flex-col gap-10 rounded-lg border border-gray-100 bg-white p-3 shadow-md md:absolute md:max-h-[400px] md:min-w-max md:flex-row md:backdrop-blur">
				{links
					?.slice(0, 2)
					.map((label: any, key: any) => (
						<NavItemList {...label} key={key} locale={locale} />
					))}
			</ul> */}
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</>
	)
}

export default LangSelect
