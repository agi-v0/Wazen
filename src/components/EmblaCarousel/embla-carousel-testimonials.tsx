import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'

import EmblaCarouselClient from '.'
import { Img } from '@/components/Img'
import { clean, cn } from '@/lib/utils'

type EmblaCarouselProps = {
	slides: Sanity.Testimonial[]
	options?: EmblaOptionsType
	locale?: string
}

const components: PortableTextComponents = {
	types: {
		block: ({ value }: PortableTextTypeComponentProps<any>) => (
			<p className="text-larger mx-auto max-w-3xl font-semibold text-cyan-950 md:max-w-3xl">
				{value.children
					.map((child: any) =>
						child.text.includes('"') ? child.text : `"${child.text}"`,
					)
					.join('')}
			</p>
		),
	},
}

const EmblaCarouselTestimonials = ({
	slides,
	options,
	locale = 'en',
}: EmblaCarouselProps) => {
	return (
		<EmblaCarouselClient options={options} locale={locale}>
			{slides.map(({ content, author }, index) => {
				const authorImage = author?.image
				const hasAsset = Boolean(
					authorImage &&
						typeof authorImage === 'object' &&
						'asset' in authorImage,
				)

				return (
					<div className="embla__slide" key={index}>
						<div className="slide-item flex h-full flex-col items-center justify-center gap-8 rounded-2xl border border-gray-100 bg-teal-100 px-(--padding-horizontal--main) py-(--size--4rem) text-center transition-all">
							<PortableText value={content} components={components} />
							<div className="flex flex-row gap-4">
								<Img
									loading="lazy"
									image={authorImage}
									className="aspect-square size-10 rounded-full object-cover object-top-left"
								/>
								<div
									className={cn(
										'flex flex-col text-start text-sm text-cyan-950',
										hasAsset ? 'items-start' : 'items-center',
									)}
								>
									{author && (
										<>
											<p className="font-medium">{clean(author.name)}</p>
											<p className="text-cyan-950/60">
												{author?.title && clean(author.title)}
											</p>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				)
			})}
		</EmblaCarouselClient>
	)
}

export default EmblaCarouselTestimonials
