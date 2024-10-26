'use client'

import Brief from './Brief'
import dynamic from 'next/dynamic'

const Sidebar = dynamic(() => import('@/components/animated/side-bar'))
const MobileApp = dynamic(() =>
	import('@/components/animated/iphone-chart').then((mod) => mod.default),
)
const Integrations = dynamic(() =>
	import('@/components/animated/integrations').then((mod) => mod.default),
)
const Reports = dynamic(() => import('@/components/animated/reports'))

export default function BriefGroup({
	briefs,
}: Partial<{
	briefs: Sanity.Module[]
}>) {
	//replace images and image components with an array of interactive components
	const animatedComponents: any = [
		<Sidebar key="Sidebar" />,
		<Reports key="Reports" />,
		<MobileApp key="MobileApp" />,
		<Integrations key="Integrations" />,
	]
	return (
		<div className="bg-white py-[var(--size--4-5rem)]">
			{briefs?.map((brief, index) => (
				<Brief
					{...brief}
					image={
						brief.image && 'asset' in brief.image
							? brief.image
							: animatedComponents[index]
					}
					key={brief._key}
				/>
			))}
		</div>
	)
}
