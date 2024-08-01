import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { stegaClean } from '@sanity/client/stega'
import CTAList from '../CTAList'
import { Icon } from '@iconify/react'
import Img from '../Img'

export default function FeaturesGridTwo({
	pretitle,
	content,
	ctas,
	features,
	textAlign = 'center',
}: Partial<{
	pretitle: string
	content: any
	Subtitle: any
	ctas: any
	features: {
		features: [
			feature: {
				icon: { name: string }
				image: Sanity.Image
				title: string
				description: string
			},
		]
	}[]
	textAlign: React.CSSProperties['textAlign']
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-main mx-auto max-w-xl text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}
	const featureStyle: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h3') {
					return (
						<h3 className="text-main font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h3>
					)
				}
				return (
					<p className="text-small max-w-xl text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}
	return (
		<section className={'bg-cyan-950/10 py-[var(--size--4rem)]'}>
			<div className="section fluid-padding">
				<div
					className={
						'fluid-gap fluid-padding flex w-full flex-col items-center justify-center rounded-2xl bg-white'
					}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<div className="flex flex-col items-center gap-6">
						<Pretitle className={'text-large font-semibold text-gray-400'}>
							{pretitle}
						</Pretitle>
						<PortableText value={content} components={components} />
					</div>
					<div className="flex flex-col gap-6">
						{features?.map((block) => (
							<ul className="grid w-full grid-flow-row gap-6 *:bg-cyan-50 md:grid-flow-col">
								{block &&
									block.features.map((feature) => (
										<li
											className="group flex max-h-[400px] w-full flex-col justify-start overflow-hidden rounded-xl text-start lg:max-h-[500px]"
											key={feature.title}
										>
											<div className="space-y-4 p-6">
												<div className="flex flex-row items-center gap-4">
													{feature.icon && (
														<div className="self-start rounded-md bg-cyan-800 p-2">
															<Icon
																icon={feature.icon.name}
																className="text-xl text-cyan-50"
															/>
														</div>
													)}
													<h3 className="text-large font-semibold text-gray-950 ltr:leading-tight">
														{feature.title}
													</h3>
												</div>
												<p className="text-base text-gray-950/60">
													{feature.description}
												</p>
											</div>
											<Img
												image={feature.image}
												className="h-auto w-full translate-y-0 scale-[99%] px-6 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-100 group-hover:drop-shadow-lg"
											/>
										</li>
									))}
							</ul>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
