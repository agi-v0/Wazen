import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import Pretitle from '../Pretitle'
import Image from 'next/image'
import blob from '../../../public/gradient-blob2.svg'
import { clean } from '@/lib/utils'

export default function HeroThree({
	pretitle,
	content,
	ctas,
	image,
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
						<h1 className="h1 text-pretty font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h1>
					)
				}
				if (value.style === 'h2') {
					return (
						<h2 className="text-large font-semibold leading-tight text-teal-600">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-main mx-auto text-cyan-950/80 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section className="section bg-white">
			<div
				className={
					'md:fluid-gap flex w-full flex-col items-center justify-evenly gap-8 lg:min-h-screen lg:flex-row'
				}
			>
				<Img
					image={image}
					alt={clean(image?.alt || pretitle)}
					className="relative aspect-[4/3] h-auto w-full overflow-hidden rounded-2xl border-8 border-white object-cover shadow-md lg:aspect-square lg:max-w-[560px]"
					imageWidth={3000}
					draggable={false}
					fetchPriority="high"
					loading="eager"
				/>
				<div className="flex flex-col items-start gap-6">
					<Pretitle className="text-base font-medium text-gray-400">
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={components} />
					<CTAList
						ctas={ctas}
						className="mt-2 w-full *:h-12 *:text-lg *:max-md:w-full"
					/>
				</div>
				<Image
					src={blob}
					alt="hero"
					className="pointer-events-none absolute z-[-1] aspect-square h-[100%] w-auto object-cover"
					draggable={false}
				/>
			</div>
		</section>
	)
}
