'use client'

import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { stegaClean } from '@sanity/client/stega'
import CTAList from '../CTAList'
import { FaCube } from 'react-icons/fa6'

export default function Features({
	pretitle,
	content,
	Subtitle,
	ctas,
	features,
	textAlign = 'center',
}: Partial<{
	pretitle: string
	content: any
	Subtitle: any
	ctas: any
	features: any
	textAlign: React.CSSProperties['textAlign']
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h4') {
					return (
						<h4 className="font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h4>
					)
				}
				if (value.style === 'h3') {
					return (
						<h3 className="font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h3>
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
				if (value.style === 'h4') {
					return (
						<h4 className="text-start text-2xl font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h4>
					)
				}
				if (value.style === 'h3') {
					return (
						<h3 className="text-start text-2xl font-semibold leading-tight text-cyan-950 ">
							{value.children.map((child: any) => child.text).join('')}
						</h3>
					)
				}
				return (
					<p className="max-w-xl text-start text-gray-600 md:max-w-3xl">
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
					<PortableText value={Subtitle} components={components} />
					<div className="text-center">
						<CTAList ctas={ctas} />
					</div>
					<div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-2 [&>*:nth-child(even)]:bg-teal-100">
						{features.map((feature: any, index: any) => (
							<div
								className="flex h-[250px] w-[350px]  rounded-md bg-cyan-50 p-6"
								key={index}
							>
								<div className="flex flex-col justify-start gap-4">
									<FaCube className="text-2xl" />
									<PortableText
										value={feature.feature}
										components={featureStyle}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
