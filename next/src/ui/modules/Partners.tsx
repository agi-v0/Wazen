import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { PortableText } from '@portabletext/react'
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
		logos || (await fetchSanity<Sanity.Logo[]>(groq`*[_type == 'partnerslogos']`))

	return (
		
		<section className="section space-y-8">
			<header className="richtext text-center flex flex-col gap-6">
				<PortableText value={content}/>
				<PortableText value={Subtitle} />
			</header>

			<figure className="item-center p-4 mx-auto flex flex-wrap justify-center gap-x-4 gap-y-14">
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
