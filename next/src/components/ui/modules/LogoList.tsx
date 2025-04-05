import { fetchSanity, groq } from '@/sanity/lib/fetch'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '../Pretitle'
import { Img } from '@/components/ui/Img'

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
		logos ||
		(await fetchSanity<Sanity.Logo[]>({ query: groq`*[_type == 'logo']` }))

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
					<p className="text-main font-semibold text-gray-400">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}
	return (
		<section className="section p-[var(--size--6rem)]">
			<div className="fluid-gap flex w-full flex-col items-center">
				<Pretitle className="text-main text-center font-medium text-cyan-950/80">
					{pretitle}
				</Pretitle>
				<PortableText value={content} components={components} />

				<figure className="flex w-full flex-wrap items-center justify-center gap-12">
					{allLogos.map((logo, key) => (
						<Img
							key={key}
							className="svg-container h-12 w-auto opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
							image={logo.icon}
							alt={logo.name}
							// svg={true}
						/>
					))}
				</figure>
			</div>
		</section>
	)
}
