import InteractiveDetails from './InteractiveDetails'
import { PiCaretRight } from 'react-icons/pi'

import { NavItemMenu } from '@/components/nav-item-menu'
import Image from 'next/image'

export default function LinkList({ label, links }: Sanity.LinkList) {
	return (
		<InteractiveDetails className="group relative">
			<summary className="link flex h-8 items-center gap-1 rounded px-3 no-underline hover:bg-[#F9FAFB] hover:text-teal-600">
				{label}
				<PiCaretRight className="transition-transform group-open:rotate-90 md:rotate-90" />
			</summary>

			{/* //@ Style Doesn't work in This Component */}
			{/* {links && <NavItemMenu links={links} />} */}
			{links && (
				<ul className="anim-fade-to-b -start-32 top-full flex w-[570px] flex-col justify-between gap-2 border bg-white p-2 md:absolute md:flex-row">
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
									<li className="mt-4 font-bold">{links?.[0].label}</li>
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
										<ul
											className="px-3 py-2 hover:bg-gray-50 hover:first-line:text-teal-600"
											key={key}
										>
											<li className="font-bold ">{link.label}</li>
											<li>{link.description}</li>
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
