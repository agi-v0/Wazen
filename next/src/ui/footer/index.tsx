import Navigation from './Navigation'
import Social from '@/ui/Social'
import Link from 'next/link'
import Image from 'next/image'
import { getSite } from '@/lib/sanity/queries'

export default async function Footer({ locale }: any) {
	const { footerMenu, staticLinks } = await getSite(locale)

	return (
		<section className="bg-cyan-950 text-center text-white">
			<div className="section relative overflow-hidden py-12">
				<div className="svg-container pointer-events-none absolute top-[50%] hidden h-auto w-full max-w-screen-xl fill-white opacity-15">
					<Image
						src="/wazen-logo-white.svg"
						alt="Logo"
						height={24}
						width={85.37}
					/>
				</div>

				<div className="flex w-full flex-col justify-between gap-20">
					<div className="flex w-full flex-col justify-between gap-10 lg:flex-row">
						<Link className="font-bold" href="/">
							<Image
								src="/wazen-logo-white.svg"
								alt="Logo"
								height={24}
								width={85.37}
							/>
						</Link>
						<Navigation footerMenu={footerMenu} />
					</div>
					<Social
						locale={locale}
						className="justify-between"
						staticLinks={staticLinks}
					/>
				</div>
			</div>
		</section>
	)
}
