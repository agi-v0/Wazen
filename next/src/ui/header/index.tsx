import dynamic from 'next/dynamic'
import Link from 'next/link'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { Navigation } from './Navigation'
import CTAList from '@/ui/CTAList'
import Toggle from './Toggle'
import Logo from '@/components/ui/logo'
import { headers } from 'next/headers'
const Wrapper = dynamic(() => import('./Wrapper'))
const LangSelect = dynamic(() => import('./lang-select'))

export default async function Header({
	locale,
	headerMenu,
	ctas,
	contactInfo,
}: {
	locale: string
	headerMenu?: Sanity.Navigation
	ctas?: Sanity.CTA[]
	contactInfo?: any
}) {
	const headerList = headers()
	const pathname: any = headerList.get('x-current-path')
	return (
		<Wrapper
			className="fixed top-0 z-10 w-full bg-white"
			contactInfo={contactInfo?.contactInfo}
			locale={locale}
			pathname={pathname}
		>
			<div
				className={
					'section mx-auto flex w-full flex-row items-center justify-between gap-4 py-4 transition-all duration-200 max-lg:h-screen max-lg:flex-col max-lg:gap-4 max-lg:overflow-y-scroll max-lg:pb-5 max-lg:header-closed:h-full max-lg:header-closed:py-3'
				}
			>
				<div className="flex flex-row items-center justify-between max-lg:w-full">
					<Link
						className="flex h-10 items-center justify-center"
						href="/"
						aria-label={locale == 'en' ? 'Homepage' : 'الصفحة الرئيسية'}
					>
						<Logo className="max-lg:h-5" locale={locale} />
					</Link>
					<Toggle className="" />
				</div>

				<NavigationMenu
					dir={locale == 'en' ? 'ltr' : 'rtl'}
					className="w-full max-w-full max-lg:space-y-4 *:max-lg:w-full max-lg:header-closed:hidden"
				>
					{headerMenu && <Navigation headerMenu={headerMenu} locale={locale} />}
					<div className="flex w-full flex-col-reverse items-center justify-center gap-4 text-center max-lg:header-closed:hidden lg:flex-row lg:justify-end">
						<LangSelect pathname={pathname} />
						<CTAList className="text-base max-lg:w-full" ctas={ctas} />
					</div>
				</NavigationMenu>
			</div>
		</Wrapper>
	)
}
