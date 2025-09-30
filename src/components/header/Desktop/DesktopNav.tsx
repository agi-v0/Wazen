import { NavigationMenu } from '@/components/ui/navigation-menu'
import { Navigation } from './Navigation'
import Logo from '@/components/logo'
import Button from '../../LinkButton'
import { Link } from '@/i18n/routing'
import dynamic from 'next/dynamic'

const LangSelect = dynamic(() => import('../LangSelect'))

interface DesktopNavProps {
	locale: 'en' | 'ar'
	headerMenu?: Sanity.Navigation
	ctas?: Sanity.CTA[]
}

export default function DesktopNav({
	locale,
	headerMenu,
	ctas,
}: DesktopNavProps) {
	return (
		<div className="section hidden w-full flex-row items-center justify-between gap-4 py-4 transition-all duration-200 lg:flex">
			{/* Desktop Logo */}
			<Link
				className="flex h-10 items-center justify-center"
				href="/"
				aria-label={locale == 'en' ? 'Homepage' : 'الصفحة الرئيسية'}
			>
				<Logo className="" locale={locale} />
			</Link>

			{/* Desktop Navigation */}
			<NavigationMenu
				dir={locale == 'en' ? 'ltr' : 'rtl'}
				className="w-full max-w-full"
			>
				{headerMenu && <Navigation headerMenu={headerMenu} locale={locale} />}
				<div className="flex w-full flex-row items-center justify-end gap-4 text-center">
					<LangSelect />
					<div className="flex flex-row items-center gap-4 text-base">
						{ctas?.map((cta, key) => <Button {...cta} key={key} />)}
					</div>
				</div>
			</NavigationMenu>
		</div>
	)
}
