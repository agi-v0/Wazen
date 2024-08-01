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
import Image from 'next/image'
import blob from '../../../public/gradient-blob2.svg'

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
						<h1 className="h1 text-pretty font-semibold leading-tight">
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
					<p className="text-main mx-auto max-w-xl text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section className="section mt-[var(--header-height)] flex min-h-screen lg:max-h-fold">
			<div
				className={
					'md:fluid-gap my-auto flex w-full flex-col items-center justify-evenly gap-8 lg:flex-row'
				}
			>
				<Img
					image={image}
					imageWidth={1024}
					alt={pretitle}
					className="relative aspect-[4/3] h-auto w-full overflow-hidden rounded-2xl border-8 border-white object-cover shadow-md lg:aspect-[3/4] lg:max-w-[450px]"
				/>
				<div className="flex flex-col items-start gap-6">
					<Pretitle className="text-large font-semibold text-gray-400">
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={components} />
					<CTAList ctas={ctas} className="mt-2 w-full *:h-12 *:w-full" />
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
