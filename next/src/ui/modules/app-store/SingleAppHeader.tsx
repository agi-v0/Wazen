import CTAList from '@/ui/CTAList'
import Img from '@/ui/Img'

export default async function SingleAppHeader({ app }: { app: any }) {
	return (
		<section className="section py-12">
			<div className="flex w-full flex-col items-center justify-center gap-y-6 rounded-2xl p-12 py-24">
				<div className="relative flex flex-col items-start justify-center gap-8 p-6 lg:flex-row">
					<div className="relative min-h-[150px] min-w-[150px] grow overflow-hidden rounded-md">
						<Img
							image={app[0].icon}
							className="size-32 rounded-2xl object-cover shadow-md"
							imageWidth={600}
						/>
					</div>
					<div className="content space-y-6">
						<p className="h2 font-semibold text-cyan-950 group-hover:text-cyan-900">
							{app[0].metadata.title}
						</p>
						<p className="text-base text-gray-600">
							{app[0]?.description[0]?.children &&
								app[0].description[0].children[0].text}
						</p>
						<CTAList ctas={app[0].ctas} className="w-full *:h-12 *:text-base" />
					</div>
				</div>
			</div>
		</section>
	)
}
