import { getSite } from '@/lib/sanity/queries'
import Wrapper from './Wrapper'
import Link from 'next/link'
import Navigation from './Navigation'
import CTAList from '@/ui/CTAList'
import Toggle from './Toggle'
import { cn } from '@/lib/utils'
import css from './Header.module.css'
import Image from 'next/image'
import LangSelect from '@/components/lang-select'

export default async function Header() {
	const { ctas } = await getSite()

	return (
		<Wrapper className="fixed top-0 z-10 w-full bg-white px-2 backdrop-blur">
			<div className={cn(css.header, 'grid p-3')}>
				<div className="flex flex-col items-start gap-x-10 [grid-area:logo] md:flex-row md:items-center">
					<Link className="font-bold" href="/">
						<Image
							src="wazen-logo.svg"
							alt="wazen logo"
							width={80}
							height={80}
						/>
					</Link>
					<Navigation />
				</div>

				<div className="flex flex-col-reverse items-center justify-center gap-x-10 gap-y-3 text-center [grid-area:ctas] max-md:header-closed:hidden md:flex-row">
					<LangSelect />
					<CTAList className="max-md:*:w-full " ctas={ctas} />
				</div>

				<Toggle />
			</div>
		</Wrapper>
	)
}
