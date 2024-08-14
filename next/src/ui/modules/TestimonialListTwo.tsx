'use client'

import { cn } from '@/lib/utils'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'
import React, { useEffect, useState } from 'react'
import Img from '../Img'
import EmblaCarousel from '@/components/EmblaCarousel/embla-carousel-testimonials'
import { EmblaOptionsType } from 'embla-carousel'
import Pretitle from '../Pretitle'

const TestimonialListTwo = ({
	pretitle,
	content,
	locale,
	testimonials,
	className,
}: {
	pretitle: string
	content: any
	locale: string
	testimonials: Sanity.Testimonial[]
	className?: string
}) => {
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
					<p className="text-main mx-auto max-w-xl text-cyan-950 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}
	const direction = locale === 'en' ? 'ltr' : 'rtl'
	const OPTIONS: EmblaOptionsType = { direction: direction, loop: true }
	return (
		<section className="fluid-gap max-w-screen flex h-full max-h-fold w-full flex-col items-center justify-center overflow-hidden bg-white py-[var(--size--8rem)]">
			<div className="section mx-auto text-center">
				<Pretitle className="text-large font-medium text-gray-400">
					{pretitle}
				</Pretitle>
				{content && <PortableText value={content} components={components} />}
			</div>
			<EmblaCarousel slides={testimonials} options={OPTIONS} locale={locale} />
		</section>
	)
}

export default TestimonialListTwo
