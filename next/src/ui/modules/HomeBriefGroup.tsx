import Brief from './Brief'
import { AnimatedBeamDemo } from '../../components/animated/integrations'
import { MobileApp } from '../../components/animated/iphone-chart'
import SideBar from '@/components/animated/side-bar'

export default function BriefGroup({
	briefs,
}: Partial<{
	briefs: Sanity.Module[]
}>) {
	//replace images and image components with an array of interactive components
	const animatedComponents: any = [
		<SideBar />,
		<MobileApp />,
		<MobileApp />,
		<AnimatedBeamDemo />,
	]
	return (
		<div className="bg-gradient-to-b from-teal-50 from-90% to-white">
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
