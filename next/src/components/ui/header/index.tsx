import dynamic from 'next/dynamic'
import MobileNav from './Mobile/MobileNav'
import DesktopNav from './Desktop/DesktopNav'

const Wrapper = dynamic(() => import('./Wrapper'))

export default async function Header({
	locale,
	headerMenu,
	ctas,
	contactInfo,
}: {
	locale: 'en' | 'ar'
	headerMenu?: Sanity.Navigation
	ctas?: Sanity.CTA[]
	contactInfo?: any
}) {
	return (
		<Wrapper
			className="fixed top-0 z-10 w-full bg-white"
			contactInfo={contactInfo?.contactInfo}
			locale={locale}
		>
			{/* Desktop Navigation */}
			<DesktopNav locale={locale} headerMenu={headerMenu} ctas={ctas} />

			{/* Mobile Navigation */}
			<MobileNav locale={locale} headerMenu={headerMenu} ctas={ctas} />
		</Wrapper>
	)
}
