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
		<section className={'section p-12'}>
			<div
				className={
					'flex w-full flex-col items-center justify-evenly gap-10 gap-y-6 overflow-hidden p-10'
				}
			>
				<div
					className={'flex flex-col items-center gap-8'}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<Pretitle className={'py-1 text-4xl text-gray-400'}>
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={components} />
					<div className="text-center">
						<CTAList ctas={ctas} />
					</div>
					<div className="grid w-full grid-cols-1 gap-3 md:grid-rows-2 lg:grid-cols-3 [&>*:nth-child(even)]:bg-teal-100">
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
									<div
										className="flex w-[350px] rounded-md bg-cyan-50 p-6"
										key={index}
									>
										<div className="flex flex-col justify-start gap-4 text-start">
											<Icon
												icon={
													feature.icon ? feature.icon.name : 'ph:cube-duotone'
												}
												style={{ color: '#083344', fontSize: '48px' }}
											/>
											<h3 className="text-main font-semibold leading-tight text-cyan-950">
												{feature.title}
											</h3>

											<p className="text-small max-w-xl text-gray-600 md:max-w-3xl">
												{feature.description}
											</p>
										</div>
									</div>
								),
							)}
					</div>
				</div>
			</div>
		</section>
	)
}
