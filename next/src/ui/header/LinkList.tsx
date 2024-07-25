import InteractiveDetails from './InteractiveDetails'
import CTA from '@/ui/CTA'
import { PiCaretRightBold, PiCaretLeftBold } from 'react-icons/pi'
import Image from 'next/image'

export default function LinkList({ label, links, locale }: Sanity.LinkList) {
	return (
		<InteractiveDetails className="relative">
			<summary className="group flex h-8 items-center gap-1 rounded-md px-3 font-medium text-cyan-950/80 no-underline transition-all hover:bg-teal-50 hover:text-cyan-700">
				{label}
				<PiCaretRightBold className="size-3 translate-y-0 text-cyan-950/50 transition-transform duration-300 group-open:rotate-90 group-hover:translate-y-[2px] group-hover:text-cyan-700/50 md:rotate-90" />
			</summary>

			{/* //@ Style Doesn't work in This Component */}
			{/* {links && <NavItemMenu links={links} />} */}
			{links && (
				<ul className="anim-fade-to-b -start-32 top-full grid grid-flow-row grid-cols-1 justify-between gap-2 rounded-lg border border-gray-100 bg-white p-2 shadow-md md:absolute md:max-h-fit md:min-w-[640px] lg:grid-flow-col lg:grid-cols-2">
					{links?.[0] && (
						<li className={'w-full lg:row-span-3'}>
							<CTA
								link={links[0]}
								locale={locale}
								className="group relative flex h-full w-full flex-col gap-3 rounded-md bg-gradient-to-b from-teal-400 to-cyan-900 p-3 text-white hover:shadow-md"
							>
								<Image
									src={'/dashboard-image.png'}
									alt=""
									width={250}
									height={250}
									className="h-auto w-full rounded-md"
								/>
								<div className="flex flex-col justify-start transition-all">
									<div className="flex flex-row items-center font-medium text-white">
										{links?.[0].label}
										<PiCaretLeftBold className="size-3 text-white/50 opacity-0 transition-transform group-hover:-translate-x-1 group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1" />
									</div>
									<span className="text-white/80 group-hover:text-white">
										{links?.[0].description}
									</span>
								</div>
							</CTA>
						</li>
					)}
					{links.slice(1).map((link, key) => (
						<li key={key} className="group relative flex w-full flex-col">
							<CTA link={link} locale={locale} className="p-3 hover:bg-teal-50">
								<div className="flex flex-col justify-start transition-all">
									<div className="flex flex-row items-center font-medium text-gray-950 group-hover:text-teal-600">
										{link.label}
										<PiCaretLeftBold className="size-3 text-teal-500/50 opacity-0 transition-transform group-hover:-translate-x-1 group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1" />
									</div>
									<span className="text-gray-600 group-hover:text-cyan-950">
										{link.description}
									</span>
								</div>
							</CTA>
							{/* <a href={links?.[0].external}>
							{links
								?.slice(1)
								.map(
									(link: { label: string; description: string }, key: any) => (
										<ul className="px-3 py-2 hover:bg-gray-500/5" key={key}>
											<li className="font-medium text-gray-950">
												{link.label}
											</li>
											<li className="text-gray-600">{link.description}</li>
										</ul>
									),
								)}
						</a> */}
						</li>
					))}
				</ul>
			)}
		</InteractiveDetails>
	)
}
