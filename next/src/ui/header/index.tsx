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
					'section mx-auto flex h-full flex-col justify-between py-4 max-md:flex-col lg:flex-row'
				}
			>
				<div className="flex flex-row items-center justify-start max-lg:w-full max-lg:justify-between">
					<Link className="font-bold" href="/">
						<Logo />
					</Link>
					<Toggle />
				</div>
				<div className="flex flex-col items-center justify-start gap-4 text-center max-lg:header-closed:hidden md:flex-col lg:flex-row">
					{headerMenu && <Navigation headerMenu={headerMenu} locale={locale} />}
					<LangSelect />
					{ctas && <CTAList className="max-md:*:w-full" ctas={ctas} />}
				</div>
			</div>
		</Wrapper>
	)
}
