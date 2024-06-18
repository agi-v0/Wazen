import { fetchSanity, groq } from '@/lib/sanity/fetch'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Img from '../Img'

export default async function Partners({
	content,
	Subtitle,
	logoType = 'default',
	logos,
}: Partial<{
	content: any
	Subtitle: any
	logoType: 'default' | 'light' | 'dark'
	logos: Sanity.Logo[]
}>) {
	const allLogos =
		logos ||
		(await fetchSanity<Sanity.Logo[]>(groq`*[_type == 'partnerslogos']`))
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
					<p className="text-main mx-auto max-w-xl text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section className="section space-y-8 py-12">
			<header className="richtext flex flex-col gap-6 text-center">
				<PortableText value={content} components={components} />
				<PortableText value={Subtitle} />
			</header>

			<figure className="item-center mx-auto flex flex-wrap justify-center gap-x-4 gap-y-14 p-4">
				{allLogos.map((logo, key) => (
					<Img
						className="max-h-[2em] max-w-[200px] object-contain"
						image={logo.image[logoType]}
						imageWidth={400}
						key={key}
					/>
				))}
			</figure>
		</section>
	)
}
