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
	mainTitle,
	Subtitle,
	ctas,
	image,
	textAlign = 'start',
	alignItems,
}: Partial<{
	pretitle: any
	mainTitle: any
	Subtitle: any
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
						<h1 className="text-4xl font-semibold leading-tight lg:text-5xl">
							{value.children.map((child: any) => child.text).join('')}
						</h1>
					)
				}
				return (
					<p className="text-main mx-auto max-w-xl md:max-w-3xl">
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
					'section mt-14 flex w-full flex-col items-center justify-evenly gap-10 gap-y-6 p-10 lg:flex-row'
				}
			>
				<div className="h-[400px] w-full lg:max-w-[400px]">
					<div className="brief-background relative h-full overflow-hidden rounded-sm border-8 border-white shadow-md">
						<div
							className={'h-full w-full'}
						>
							<Img image={image} imageWidth={3000} />
						</div>
					</div>
				</div>
				<div
					className={'flex max-w-2xl flex-col items-start gap-8'}
					// style={{ textAlign: stegaClean(textAlign) }}
				>
					<Pretitle className={'py-1 text-lg text-gray-400'}>
						{pretitle}
					</Pretitle>
					<PortableText value={mainTitle} components={components} />
					<PortableText value={Subtitle} components={components} />

					<CTAList ctas={ctas} />
				</div>
			</div>
		</section>
	)
}
