import Brief from './Brief'
import Sidebar from '../../../public/How-it-works/Sidebar.svg'
import Image from 'next/image'

export default function BriefGroup({
	briefs,
}: Partial<{
	briefs: Sanity.Module[]
}>) {
	//replace images and image components with an array of interactive components
	const images: any = [Sidebar, Sidebar, Sidebar]
	const imageComponents: any = images.map((image: any) => (
		<Image
			src={image}
			alt="image"
			className="bottom-0 top-0 mx-auto h-full w-auto"
		/>
	))
	return (
		<div className="bg-gradient-to-b from-teal-50 from-90% to-white">
			{briefs?.map((brief, index) => (
				<Brief
					{...brief}
					image={
						brief.image && 'asset' in brief.image
							? brief.image
							: imageComponents[index]
					}
					key={brief._key}
				/>
			))}
		</div>
	)
}
