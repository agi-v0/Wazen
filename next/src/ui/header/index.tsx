import Wrapper from './Wrapper'
import Link from 'next/link'
import Navigation from './Navigation'
import CTAList from '@/ui/CTAList'
import Toggle from './Toggle'
import LangSelect from '@/components/ui/lang-select'
import Logo from '@/components/ui/logo'

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
					'section mx-auto flex h-full flex-row items-start justify-between py-4 max-md:flex-row lg:items-center'
				}
			>
				<div className="flex w-full flex-col items-start lg:flex-row lg:items-center lg:justify-start lg:gap-x-2">
					<Link className="font-bold" href="/">
						<Logo />
					</Link>
					{headerMenu && <Navigation headerMenu={headerMenu} locale={locale} />}
				</div>
				<div className="flex w-full flex-col-reverse items-center justify-center gap-4 text-center max-lg:header-closed:hidden lg:flex-row lg:justify-end">
					{/* <LangSelect /> */}
					<CTAList className="max-md:*:w-full" ctas={ctas} />
				</div>
				<Toggle />
			</div>
		</Wrapper>
	)
}
