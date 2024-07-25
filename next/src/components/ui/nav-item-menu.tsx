// 'use client'
// import Image from 'next/image'
// import { Key } from 'react'

// export function NavItemMenu({ links }: any) {
// 	return (
// 		<ul className="anim-fade-to-b -start-32 top-full flex w-full flex-col justify-between gap-3 border bg-white p-3 md:absolute md:min-w-[570px] md:flex-row">
// 			{links?.[0] && (
// 				<li
// 					className={
// 						'w-full rounded-md bg-gradient-to-b from-teal-400 to-teal-900 p-4 text-white hover:shadow-md md:w-[50%]'
// 					}
// 				>
// 					<a href={links?.[0].external} className="h-full">
// 						<Image
// 							src={'/dashboard-image.png'}
// 							alt=""
// 							width={250}
// 							height={250}
// 						/>
// 						<ul>
// 							<li className="mt-4 font-bold">{links?.[0].label}</li>
// 							<li>{links?.[0].description}</li>
// 						</ul>
// 					</a>
// 				</li>
// 			)}
// 			<li className="flex w-full flex-col md:w-[50%]">
// 				<a href={links?.[0].external}>
// 					{links
// 						?.slice(1)
// 						.map((link: { label: string; description: string }, key: any) => (
// 							<ul
// 								className="px-3 py-2 hover:bg-gray-50 hover:first-line:text-teal-600"
// 								key={key}
// 							>
// 								<li className="font-bold ">{link.label}</li>
// 								<li>{link.description}</li>
// 							</ul>
// 						))}
// 				</a>
// 			</li>
// 		</ul>
// 	)
// }
