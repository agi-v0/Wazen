'use client'

import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { stegaClean } from '@sanity/client/stega'
import CTAList from '../CTAList'
import { Icon } from '@iconify/react'

export default function Features({
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
		<section
			className={
				'section fluid-vertical-space bg--gradient-to-b from-white from-10% via-cyan-50 via-50% to-white to-100%'
			}
		>
			<div
				className={'fluid-gap flex w-full flex-col items-center justify-evenly'}
				style={{ textAlign: stegaClean(textAlign) }}
			>
				<div className="flex flex-col items-center gap-6">
					<Pretitle className={'text-large font-semibold text-gray-400'}>
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={components} />
				</div>

				<ul className="grid w-full grid-cols-1 gap-6 from-cyan-100 to-teal-100 md:grid-cols-2 lg:grid-cols-3 [&>*:nth-child(even)]:bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))]">
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
									className="flex w-full flex-col justify-start gap-8 rounded-xl bg-cyan-50 p-6 text-start shadow-lg"
									key={index}
								>
									<div className="self-start rounded-full bg-white p-3">
										<Icon
											icon={
												feature.icon ? feature.icon.name : 'ph:cube-duotone'
											}
											style={{
												color: '#083344',
												fontSize: '2rem',
											}}
										/>
									</div>
									<div className="space-y-4">
										<h3 className="text-main font-semibold leading-tight text-cyan-950">
											{feature.title}
										</h3>
										<p className="text-small max-w-xl text-cyan-950/60 md:max-w-3xl">
											{feature.description}
										</p>
									</div>
								</li>
							),
						)}
				</ul>
				<div className="text-center">
					<CTAList ctas={ctas} />
				</div>
			</div>
		</section>
	)
}
