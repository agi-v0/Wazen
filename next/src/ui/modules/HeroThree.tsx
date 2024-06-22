import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import Pretitle from '../Pretitle'

export default function HeroThree({
	pretitle,
	content,
	ctas,
	image,
	textAlign = 'start',
	alignItems,
}: Partial<{
	pretitle: any
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image & { onRight?: boolean }
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h1') {
					return (
						<h1 className="h2 text-balance font-semibold leading-tight">
							{value.children.map((child: any) => child.text).join('')}
						</h1>
					)
				} else if (value.style === 'h2') {
					return (
						<h2 className="text-large font-semibold leading-tight text-teal-600">
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
		<section className="section flex min-h-screen">
			<div
				className={
					'fluid-gap my-auto flex w-full flex-col items-center justify-evenly lg:flex-row'
				}
			>
				<div className="h-[400px] w-full lg:max-w-[400px]">
					<div className="brief-background relative h-full overflow-hidden rounded-sm border-8 border-white shadow-md">
						<div className={'h-full w-full'}>
							<Img image={image} imageWidth={3000} />
						</div>
					</div>
				</div>
				<div className="flex flex-col items-start gap-8">
					<div className="space-y-6">
						<Pretitle className="text-large font-semibold text-gray-400">
							{pretitle}
						</Pretitle>
						<PortableText value={content} components={components} />
					</div>
					<CTAList ctas={ctas} />
					{/* <div className="primary">text</div>
					<div className="secondary">text</div>
					<div className="tertiary">text</div> */}
				</div>
			</div>
		</section>
	)
}
