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
				if (value.style === 'h2') {
					return (
						<h2 className="text-xl font-semibold leading-tight text-teal-600 lg:text-2xl">
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
		<section className={'section py-12'}>
			<div className="fluid-gap flex w-full flex-col items-center justify-evenly gap-y-6 rounded-sm border-8 border-white bg-teal-50 p-6 text-teal-600 shadow-md">
				<div className="flex max-w-2xl flex-col gap-4">
					<PortableText value={content} components={components} />
				</div>
				<ul className="flex flex-col justify-evenly w-full md:flex-row">
					{steps?.map((step, index) => (
						<li
							className="flex flex-col items-center justify-center gap-4 mb-3"
							key={index}
						>
							<Img
								image={step.image}
								imageWidth={200}
								className="rounded-xl"
							/>
							<div>{step.text}</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
