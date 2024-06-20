import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { PortableText } from '@portabletext/react'
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
	// console.log(logos)
	return (
		<section className="section space-y-8 py-12">
			<header className="richtext text-main text-center text-gray-400">
				<Pretitle>{pretitle}</Pretitle>
				<PortableText value={content} />
			</header>

			<figure className="mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-6">
				{allLogos.map((logo, key) => (
					// <Img
					// 	className="h-8 w-auto"
					// 	image={logo.icon}
					// 	imageWidth={400}
					// 	key={key}
					// />
					<div
						key={key}
						className="svg-container h-6 w-auto grayscale"
						dangerouslySetInnerHTML={{ __html: logo.icon }}
					/>
				))}
			</figure>
		</section>
	)
}
