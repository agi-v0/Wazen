import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'

export default function CallToAction({
	content,
	ctas,
	image,
	textAlign = 'start',
	alignItems,
}: Partial<{
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image & { onRight?: boolean }
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
				} else if (value.style === 'h3') {
					return (
						<p className="text-large font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</p>
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
		<section className={'grid *:col-span-full *:row-span-full'}>
			<div
				className={
					'section flex w-full flex-col items-center justify-evenly gap-10 gap-y-6 p-10 lg:flex-row'
				}
			>
				<div
					className={'flex max-w-2xl flex-col items-start gap-8'}
					// style={{ textAlign: stegaClean(textAlign) }}
				>
					<PortableText value={content} components={components} />

					<CTAList ctas={ctas} />
				</div>
				<div className="h-[400px] w-full lg:max-w-[400px]">
					<div className="brief-background relative h-full overflow-hidden rounded-sm border-8 border-white shadow-md">
						<div
							className={cn(
								image?.onRight ? 'left-8' : 'right-8',
								'absolute top-8 h-full w-full min-w-[800px]',
							)}
						>
							<Img image={image} imageWidth={3000} className="rounded-xl" />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}