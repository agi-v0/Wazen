import { getSite } from '@/lib/sanity/queries'
import Wrapper from './Wrapper'
import Link from 'next/link'
import Navigation from './Navigation'
import CTAList from '@/ui/CTAList'
import Toggle from './Toggle'
import { cn } from '@/lib/utils'
import css from './Header.module.css'
import LangSelect from '@/components/lang-select'
import Image from 'next/image'

export default async function Header({ locale }: any) {
	const { ctas } = await getSite(locale)
	return (
		<Wrapper className="fixed top-0 z-10 w-full bg-white backdrop-blur">
			<div className={cn(css.header, 'section mx-auto grid h-14')}>
				<div className="flex flex-col items-start gap-x-10 [grid-area:logo] md:flex-row md:items-center">
					<Link className="font-bold" href="/">
						<Image src="/wazen-logo.svg" alt="Logo" height={24} width={85.37} />
					</Link>
					<Navigation locale={locale} />
				</div>

				<div className="flex flex-col-reverse items-center justify-center gap-x-10 gap-y-3 text-center [grid-area:ctas] max-md:header-closed:hidden md:flex-row">
					<LangSelect />
					<CTAList className="max-md:*:w-full" ctas={ctas} />
				</div>

				<Toggle />
			</div>
		</Wrapper>
	)
}
