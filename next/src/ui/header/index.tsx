import { getSite } from '@/lib/sanity/queries'
import SkipToContent from '../SkipToContent'
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
		<Wrapper className="fixed top-0 z-10 w-full bg-white backdrop-blur">
			{/* <SkipToContent /> */}

			<div
				className={cn(
					css.header,
					'mx-auto grid max-w-screen-xl items-center p-4',
				)}
			>
				<div className="flex items-center gap-x-10 [grid-area:logo-nav]">
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

				<div className="flex items-center gap-x-10 [grid-area:ctas]">
					<LangSelect />
					<CTAList
						className="max-md:*:w-full max-md:header-closed:hidden md:ml-auto"
						ctas={ctas}
					/>
				</div>

				<Toggle />
			</div>
		</Wrapper>
	)
}
