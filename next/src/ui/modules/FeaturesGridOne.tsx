import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { stegaClean } from '@sanity/client/stega'
import CTAList from '../CTAList'
import { Icon } from '@iconify/react'

export default function FeaturesGridOne({
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
	features: { title: string; description: string; icon: { name: string } }[]
	textAlign: React.CSSProperties['textAlign']
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 font-semibold leading-tight text-white">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-main mx-auto max-w-xl text-gray-200 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section className="bg-cyan-950">
			<div
				className="fluid-gap section fluid-padding flex w-full flex-col items-center py-[var(--size--6rem)]"
				style={{ textAlign: stegaClean(textAlign) }}
			>
				<div className="flex flex-col items-center gap-6">
					<Pretitle className="text-large font-semibold text-teal-100">
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={components} />
				</div>

				{ctas && (
					<div className="text-center">
						<CTAList ctas={ctas} />
					</div>
				)}

				<ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 [&>*:nth-child(even)]:bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))]">
					{features &&
						features.map(
							(
								feature: {
									title: string
									description: string
									icon: { name: string }
								},
								index: any,
							) => (
								<li
									className="flex w-full flex-col justify-start gap-2 rounded-xl p-4 text-start"
									key={index}
								>
									<div className="mb-2 self-start rounded-md bg-teal-700 p-2">
										<Icon
											icon={
												feature.icon ? feature.icon.name : 'ph:cube-duotone'
											}
											className="text-xl text-white"
										/>
									</div>
									<h3 className="text-main font-semibold leading-tight text-teal-50">
										{feature.title}
									</h3>
									<p className="text-main max-w-xl text-white/80 md:max-w-3xl">
										{feature.description}
									</p>
								</li>
							),
						)}
				</ul>
			</div>
		</section>
	)
}
