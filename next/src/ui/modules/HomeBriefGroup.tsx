import Brief from './Brief'
import Sidebar from '../../../public/How-it-works/Sidebar.svg'
import Image from 'next/image'
import { AnimatedBeamDemo } from '../../components/ui/integrations'

export default function BriefGroup({
	briefs,
}: Partial<{
	briefs: Sanity.Module[]
}>) {
	//replace images and image components with an array of interactive components
	const images: any = [
		<Image
			src={Sidebar}
			alt="image"
			className="bottom-0 top-0 mx-auto h-full w-auto"
		/>,
		<AnimatedBeamDemo />,
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
