import dynamic from 'next/dynamic'
import { getSite } from '@/lib/sanity/queries'
// import Wrapper from './Wrapper'
import Link from 'next/link'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Navigation } from './Navigation'
import CTAList from '@/ui/CTAList'
import Toggle from './Toggle'
// import LangSelect from '@/components/ui/lang-select'
import Logo from '@/components/ui/logo'
const Wrapper = dynamic(() => import('./Wrapper'))
const LangSelect = dynamic(() => import('@/components/ui/lang-select'))

export default async function Header({
	locale,
	headerMenu,
	ctas,
}: {
	locale: string
	headerMenu?: Sanity.Navigation
	ctas?: Sanity.CTA[]
}) {
	return (
		<Wrapper className="fixed top-0 z-10 w-full bg-white backdrop-blur">
			<div
				className={
					'section mx-auto flex h-full w-full flex-row items-center justify-between py-4 max-lg:flex-col max-lg:gap-4'
				}
			>
				<div className="flex flex-row items-center justify-between max-lg:w-full">
					<Link
						className="me-6 flex h-10 items-center justify-center px-4 py-4"
						href="/"
						aria-label={locale == 'en' ? 'Homepage' : 'الصفحة الرئيسية'}
					>
						<Logo />
					</Link>
					<Toggle className="" />
				</div>

				<NavigationMenu
					dir={locale == 'en' ? 'ltr' : 'rtl'}
					className="w-full max-w-full max-lg:space-y-4 *:max-lg:w-full max-lg:header-closed:hidden"
				>
					{headerMenu && <Navigation headerMenu={headerMenu} locale={locale} />}
					<div className="flex w-full flex-col-reverse items-center justify-center gap-4 text-center max-lg:header-closed:hidden lg:flex-row lg:justify-end">
						<LangSelect />
						<CTAList className="text-base *:h-12 max-lg:w-full" ctas={ctas} />
					</div>
				</NavigationMenu>
			</div>
		</Wrapper>
	)
}
