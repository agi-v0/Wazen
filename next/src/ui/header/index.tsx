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

export default async function Header({ locale }: any) {
	const site = await getSite(locale)
	if (!site) {
		return
	}
	const { ctas } = site
	return (
		<Wrapper className="fixed top-0 z-10 w-full bg-white backdrop-blur">
			<div
				className={
					'section mx-auto flex h-full flex-row items-start justify-between py-4 max-md:flex-row lg:items-center'
				}
			>
				<div className="flex w-full flex-col items-start lg:flex-row lg:items-center lg:justify-between lg:gap-x-2">
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
					<div className="flex flex-col-reverse items-center justify-center gap-4 text-center max-lg:header-closed:hidden lg:flex-row">
						<LangSelect />
						<CTAList className="max-md:*:w-full" ctas={ctas} />
					</div>
				</div>
				<Toggle />
			</div>
		</Wrapper>
	)
}
