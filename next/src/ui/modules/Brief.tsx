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
						<h2 className="text-4xl font-semibold leading-tight lg:text-5xl">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="mx-auto max-w-xl text-base font-light md:max-w-3xl md:text-lg">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section className={'grid *:col-span-full *:row-span-full'}>
			<div
				className={cn(
					image?.onRight ? 'lg:flex-row' : 'lg:flex-row-reverse',
					'flex w-full flex-col items-center justify-evenly gap-10 gap-y-6 p-10',
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
					className={'flex max-w-2xl flex-col gap-8'}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<Pretitle className={'py-1 text-4xl text-gray-400'}>
						{pretitle}
					</Pretitle>
					<PortableText value={mainTitle} components={components} />
					<PortableText value={Subtitle} components={components} />
				</div>
			</div>
		</section>
	)
}
