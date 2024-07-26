import { getSite } from '@/lib/sanity/queries'
import Wrapper from './Wrapper'
import Link from 'next/link'
import Navigation from './Navigation'
import CTAList from '@/ui/CTAList'
import Toggle from './Toggle'
import { cn } from '@/lib/utils'
import css from './Header.module.css'
import LangSelect from '@/components/ui/lang-select'
import Image from 'next/image'
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
					'section mx-auto flex h-full flex-row justify-between py-4 max-md:flex-col'
				}
			>
				<div className="flex flex-col items-start [grid-area:logo] lg:flex-row lg:items-center lg:gap-x-5">
					<Link className="font-bold" href="/">
						<Logo />
					</Link>
					{headerMenu && <Navigation headerMenu={headerMenu} locale={locale} />}
				</div>
				<div className="flex flex-col-reverse items-center justify-center gap-4 text-center max-lg:header-closed:hidden md:flex-col lg:flex-row">
					<LangSelect />
					<CTAList className="max-md:*:w-full" ctas={ctas} />
				</div>

				<Toggle />
			</div>
		</Wrapper>
	)
}
