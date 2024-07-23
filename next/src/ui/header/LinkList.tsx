import InteractiveDetails from './InteractiveDetails'
import { PiCaretRight, PiCaretRightBold } from 'react-icons/pi'

import { NavItemMenu } from '@/components/nav-item-menu'
import Image from 'next/image'

export default function LinkList({ label, links }: Sanity.LinkList) {
	return (
		<InteractiveDetails className="group relative">
			<summary className="flex h-8 items-center gap-1 rounded px-3 no-underline transition-all hover:text-cyan-700">
				{label}
				<PiCaretRightBold className="size-3 translate-y-0 text-gray-500/50 transition-transform duration-300 group-open:rotate-90 group-hover:translate-y-[2px] md:rotate-90" />
			</summary>

			{/* //@ Style Doesn't work in This Component */}
			{/* {links && <NavItemMenu links={links} />} */}
			{links && (
				<ul className="anim-fade-to-b -start-32 top-full flex flex-col justify-between gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-md md:absolute md:min-w-[570px] md:flex-row">
					{links?.[0] && (
						<li
							className={
								'w-full rounded-md bg-gradient-to-b from-teal-400 to-teal-900 p-4 text-white hover:shadow-md md:w-[50%]'
							}
						>
							<a href={links?.[0].external} className="h-full">
								<Image
									src={'/dashboard-image.png'}
									alt=""
									width={250}
									height={250}
								/>
								<ul>
									<li className="mt-4 font-semibold">{links?.[0].label}</li>
									<li>{links?.[0].description}</li>
								</ul>
							</a>
						</li>
					)}
					<li className="flex w-full flex-col md:w-[50%]">
						<a href={links?.[0].external}>
							{links
								?.slice(1)
								.map(
									(link: { label: string; description: string }, key: any) => (
										<ul className="px-3 py-2 hover:bg-gray-500/5" key={key}>
											<li className="font-semibold text-gray-950">
												{link.label}
											</li>
											<li className="text-gray-600">{link.description}</li>
										</ul>
									),
								)}
						</a>
					</li>
				</ul>
			)}
		</InteractiveDetails>
	)
}
