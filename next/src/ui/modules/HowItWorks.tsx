import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'

export default function HowItWorks({
	content,
	steps,
}: Partial<{
	content: any
	steps: {
		text: string
		image: Sanity.Image
	}[]
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h4') {
					return (
						<h4 className="text-xl font-semibold leading-tight lg:text-2xl">
							{value.children.map((child: any) => child.text).join('')}
						</h4>
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
		<section className={'section py-12'}>
			<div className="fluid-gap flex w-full flex-col items-center justify-evenly gap-y-6">
				<div className="h-[550px] w-full lg:max-w-[550px]">
					<Img image={image} imageWidth={3000} className="rounded-xl" />
				</div>
				<div className="flex max-w-2xl flex-col gap-4">
					<PortableText value={content} components={components} />
				</div>
			</div>
		</section>
	)
}
