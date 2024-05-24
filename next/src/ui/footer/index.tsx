import Navigation from './Navigation'
import Social from '@/ui/Social'
import Link from 'next/link'
import Image from 'next/image'

export default async function Footer() {
	return (
		<section className="bg-[#083344] text-center text-canvas">
			<div className="p-8">
				<div className="flex w-full flex-col justify-between gap-20">
					<div className="flex w-full flex-col justify-between gap-10 md:flex-row">
						<Link className="font-bold" href="/">
							<Image
								src="wazen-logo-white.svg"
								alt="wazen logo"
								width={80}
								height={80}
							/>
						</Link>
						<Navigation />
					</div>
					<Social className="justify-between" />
				</div>
			</div>
		</section>
	)
}
