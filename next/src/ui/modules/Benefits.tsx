import {
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'


export default function Benefits({
	benefits,
	pretitle,
	mainTitle,
	Subtitle,
	image,
	textAlign = 'center',
	alignItems,
}: Partial<{
	benefits: any
	pretitle: string
	mainTitle: any
	Subtitle: any
	image: Sanity.Image
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
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

	const content = benefits

	return (
		<section className={'section py-12'}>
			<StickyScroll content={content} />
		</section>
	)
}
