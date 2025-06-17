import { fetchSanity } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import { Img } from '@/components/ui/Img'

export default async function Partners({
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
	const allLogos: Sanity.Logo[] =
		logos ||
		(await fetchSanity({
			query: groq`*[_type == 'partners.logos']`,
		}))
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
					<p className="text-main font-medium text-gray-400">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section className="bg-cyan-950 py-12">
			<div className="fluid-gap section flex w-full flex-col items-center text-center">
				<PortableText value={content} components={components} />

				<figure className="flex w-full flex-wrap items-center justify-evenly gap-12 overflow-visible">
					{allLogos.map((logo, key) => (
						<Img
							key={key}
							image={logo.icon}
							alt={logo.name}
							className="h-11 w-auto"
						/>
					))}
				</figure>
			</div>
		</section>
	)
}
