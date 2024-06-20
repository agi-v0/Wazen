import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'

export default function Brief({
	pretitle,
	mainTitle,
	Subtitle,
	image,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	mainTitle: any
	Subtitle: any
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
			<div
				className={cn(
					image?.onRight ? 'lg:flex-row' : 'lg:flex-row-reverse',
					'fluid-gap flex w-full flex-col items-center justify-evenly gap-y-6',
				)}
			>
				<div className="h-[550px] w-full lg:max-w-[550px]">
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
				<div
					className={'flex max-w-2xl flex-col gap-4'}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<Pretitle className={'text-4xl font-semibold text-gray-400'}>
						{pretitle}
					</Pretitle>
					<PortableText value={mainTitle} components={components} />
					<PortableText value={Subtitle} components={components} />
				</div>
			</div>
		</section>
	)
}
