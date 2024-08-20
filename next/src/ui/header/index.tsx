import dynamic from 'next/dynamic'
import { getSite } from '@/lib/sanity/queries'
// import Wrapper from './Wrapper'
import Link from 'next/link'
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
					'section mx-auto flex h-full flex-row justify-between gap-4 py-4 max-lg:flex-col'
				}
			>
				<div className="flex flex-row items-center justify-start gap-4 max-lg:w-full max-lg:justify-between">
					<Link
						className=""
						href="/"
						aria-label={locale == 'en' ? 'Homepage' : 'الصفحة الرئيسية'}
					>
						<Logo />
					</Link>
					<Toggle />
				</div>
				{headerMenu && <Navigation headerMenu={headerMenu} locale={locale} />}
				<div className="flex w-full flex-col-reverse items-center justify-center gap-4 text-center max-lg:header-closed:hidden lg:flex-row lg:justify-end">
					<LangSelect />
					<CTAList className="max-md:*:w-full" ctas={ctas} />
				</div>
			</div>
		</Wrapper>
	)
}
