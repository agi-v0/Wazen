import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import Image from 'next/image'
import dropdown from '../../../public/accounting-full-option.svg'

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
						<h2 className="h2 font-semibold leading-tight text-cyan-950">
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
		<section className={'min-h-screen py-12'}>
			<div
				className={cn(
					image?.onRight ? 'lg:flex-row' : 'lg:flex-row-reverse',
					'fluid-gap section flex w-full flex-col items-center justify-evenly',
				)}
			>
				<div className="aspect-square h-[550px] w-full rounded-lg bg-white p-2 hover:shadow-lg lg:max-w-[550px]">
					<div className="brief-background relative h-full overflow-hidden rounded-lg">
						<div
							className={cn(
								image?.onRight ? 'left-8' : 'right-8',
								'absolute top-8 h-full w-full min-w-[800px]',
							)}
						>
							{/* <Img image={image} imageWidth={3000} className="rounded-xl" /> */}
						</div>
						<Image
							src={dropdown}
							alt="dropdown"
							className="bottom-0 top-0 mx-auto h-full w-auto"
						/>
					</div>
				</div>
				<div
					className={'flex max-w-2xl flex-col gap-4'}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<Pretitle className={'text-large font-semibold text-gray-400'}>
						{pretitle}
					</Pretitle>
					<PortableText value={mainTitle} components={components} />
					<PortableText value={Subtitle} components={components} />
				</div>
			</div>
		</section>
	)
}
