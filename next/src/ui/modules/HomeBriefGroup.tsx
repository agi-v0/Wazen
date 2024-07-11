import Brief from './Brief'
import { AnimatedBeamDemo } from '../../components/ui/integrations'
// import Iphone from '../../components/ui/iphone-chart'
import { MobileApp } from '../../components/ui/iphone-chart'
import SideBar from '@/components/ui/side-bar'

export default function BriefGroup({
	briefs,
}: Partial<{
	briefs: Sanity.Module[]
}>) {
	//replace images and image components with an array of interactive components
	const images: any = [
		<SideBar />,
		<AnimatedBeamDemo />,
		<MobileApp />,
		<AnimatedBeamDemo />,
	]
	return (
		<div className="bg-gradient-to-b from-teal-50 from-90% to-white">
			{briefs?.map((brief, index) => (
				<Brief
					{...brief}
					image={
						brief.image && 'asset' in brief.image ? brief.image : images[index]
					}
					key={brief._key}
				/>
			))}
		</div>
	)
}
