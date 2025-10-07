import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'

import EmblaCarouselClient from '.'
import { Img } from '@/components/Img'
import { cn } from '@/lib/utils'

type AppStoreSlide = {
	image: Sanity.Image
}

type EmblaCarouselAppStoreProps = {
	slides: AppStoreSlide[]
	options?: EmblaOptionsType
	locale?: string
}

const EmblaCarouselAppStore = ({
	slides,
	options,
	locale = 'en',
}: EmblaCarouselAppStoreProps) => (
	<EmblaCarouselClient options={options} locale={locale}>
		{slides.map((slide, index) => (
			<div className="embla__slide" key={index}>
				<div className="slide-item flex flex-col items-center justify-start rounded-lg border border-gray-100 bg-linear-to-br from-white to-indigo-50 p-3 text-start transition-all md:flex-row md:justify-between">
					<div className="max-h-[480px] w-full rounded-lg">
						<Img
							loading="lazy"
							image={slide.image}
							className="h-full w-full rounded-md object-cover"
						/>
					</div>
				</div>
			</div>
		))}
	</EmblaCarouselClient>
)

export default EmblaCarouselAppStore
