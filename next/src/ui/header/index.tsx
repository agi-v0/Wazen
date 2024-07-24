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
			<div className={cn(css.header, 'section mx-auto grid h-full p-4 md:p-2')}>
				<div className="flex flex-col items-start  lg:gap-x-5  [grid-area:logo] lg:flex-row lg:items-center">
					<Link className="font-bold" href="/">
						<Image
							src="/wazen-logo.svg"
							alt="Logo"
							height={24}
							width={85.37}
							priority
						/>
					</Link>
					<Navigation locale={locale} />
				</div>

				<div className="flex flex-col-reverse items-start lg:items-center justify-center gap-x-10 gap-y-3 text-center [grid-area:ctas] max-lg:header-closed:hidden lg:flex-row">
					<LangSelect/>
					{ctas && <CTAList className="max-md:*:w-full" ctas={ctas} />}
				</div>

				<Toggle />
			</div>
		</Wrapper>
	)
}
