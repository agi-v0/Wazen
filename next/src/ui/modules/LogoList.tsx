import { fetchSanity, groq } from '@/lib/sanity/fetch'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '../Pretitle'
import Img from '../Img'
import Image from 'next/image'

export default async function LogoList({
	pretitle,
	content,
	logoType = 'default',
	logos,
}: Partial<{
	pretitle: string
	content: any
	logoType: 'default' | 'light' | 'dark'
	logos: Sanity.Logo[]
}>) {
	const allLogos =
		logos || (await fetchSanity<Sanity.Logo[]>(groq`*[_type == 'logo']`))

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-main font-semibold text-gray-400">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}
	return (
		<section className="section py-12">
			<div className="fluid-gap flex w-full flex-col items-start">
				<PortableText value={content} components={components} />

				<figure className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-6">
					{allLogos.map((logo, key) => (
						<div
							key={key}
							className="svg-container h-11 w-auto"
							dangerouslySetInnerHTML={{ __html: logo.icon }}
						/>
					))}
				</figure>
			</div>
		</section>
	)
}
