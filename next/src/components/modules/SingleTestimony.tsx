import { Img } from '@/components/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'

export default function SingleTestimony({
	logoImage,
	testimony,
	image,
	textAlign = 'center',
	client,
	position,
	alignItems,
}: Partial<{
	logoImage: any
	testimony: any
	image: Sanity.Image & { onRight?: boolean }
	client: any
	position: any
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h5') {
					return (
						<h5 className="my-2 text-2xl font-semibold">
							{value.children.map((child: any) => child.text).join('')}
						</h5>
					)
				} else if (value.style === 'h6') {
					return (
						<h6 className="text-xl text-gray-400">
							{value.children.map((child: any) => child.text).join('')}
						</h6>
					)
				}
				return (
					<p className="mx-auto max-w-xl text-base font-bold md:max-w-3xl md:text-2xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section className={'grid *:col-span-full *:row-span-full'}>
			<div
				className={
					'section flex w-full flex-col items-center justify-evenly gap-10 gap-y-6 p-10'
				}
			>
				<Img image={logoImage} />
				<div className={'flex flex-col gap-8'}>
					<PortableText value={testimony} components={components} />

					<div>
						<Img image={image} className="mx-auto my-4 rounded-full" />
						<PortableText value={client} components={components} />
						<PortableText value={position} components={components} />
					</div>
				</div>
			</div>
		</section>
	)
}
