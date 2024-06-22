import {
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'

export default function Benefits({
	benefits,
}: Partial<{
	benefits: any
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

	const content = benefits

	return (
		<section className={'section py-12'}>
			<StickyScroll content={content} />
		</section>
	)
}
