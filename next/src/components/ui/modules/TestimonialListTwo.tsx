import { fetchSanity } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'

import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'
import EmblaCarousel from '@/components/EmblaCarousel/embla-carousel-testimonials'
import { EmblaOptionsType } from 'embla-carousel'
import Pretitle from '../Pretitle'

export default async function TestimonialListTwo({
	pretitle,
	content,
	locale,
	testimonials,
	className,
}: {
	pretitle: string
	content: any
	locale: 'en' | 'ar'
	testimonials: Sanity.Testimonial[]
	className?: string
}) {
	const allTestimonials =
		testimonials ||
		(await fetchSanity({
			query: groq`*[_type == 'testimonial' && language == $locale]`,
			params: {
				locale: locale,
			},
		}))

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 font-semibold text-cyan-950 ltr:leading-tight">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-main mx-auto max-w-xl text-cyan-950 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}
	const direction = locale === 'en' ? 'ltr' : 'rtl'
	const OPTIONS: EmblaOptionsType = {
		direction: direction,
		loop: true,
		duration: allTestimonials.length * 10,
	}
	return (
		<section className="section fluid-gap max-w-screen flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white py-[var(--size--8rem)]">
			<div className="mx-auto text-center">
				<Pretitle className="text-large font-medium text-gray-400">
					{pretitle}
				</Pretitle>
				{content && <PortableText value={content} components={components} />}
			</div>
			<EmblaCarousel
				slides={allTestimonials}
				options={OPTIONS}
				locale={locale}
			/>
		</section>
	)
}
