import Img, { Source } from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import Pretitle from '@/ui/Pretitle'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import { set2 } from '@/components/ui/portable-text'

export default function HeroTwo({
	pretitle,
	content,
	Subtitle,
	ctas,
	bgImage,
	bgImageMobile,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	Subtitle: any
	ctas: Sanity.CTA[]
	bgImage: Sanity.Image
	bgImageMobile: Sanity.Image
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const hasImage = !!bgImage?.asset

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h1') {
					return (
						<h1 className="h1 mx-auto max-w-3xl text-center font-semibold leading-tight">
							{value.children.map((child: any) => child.text).join('')}
						</h1>
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
		<section className="section py-12">
			<div className="flex w-full flex-col items-center justify-center gap-y-6 rounded-2xl bg-gradient-to-br from-white from-65% to-teal-50 p-12 py-24">
				<div
					className={cn('richtext relative space-y-6')}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<Pretitle
						className={cn(
							hasImage
								? 'text-white/40'
								: 'mx-auto w-fit px-6 py-1 text-gray-400',
						)}
					>
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={set2} />
					<CTAList
						ctas={ctas}
						className={cn(
							{
								'justify-start': stegaClean(textAlign) === 'left',
								'justify-center': stegaClean(textAlign) === 'center',
								'justify-end': stegaClean(textAlign) === 'right',
							},
							'*:h-12 *:px-6 *:text-lg',
						)}
					/>
				</div>
			</div>
		</section>
	)
}
