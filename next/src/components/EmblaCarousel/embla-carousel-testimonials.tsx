'use client'
import React, { useCallback, useEffect, useRef } from 'react'
import {
	EmblaCarouselType,
	EmblaEventType,
	EmblaOptionsType,
} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {
	NextButton,
	PrevButton,
	usePrevNextButtons,
} from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Img from '@/ui/Img'
import { PiCaretRightBold } from 'react-icons/pi'
import { clean, cn } from '@/lib/utils'
import style from './embla.module.css'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'

const TWEEN_FACTOR_BASE = 0.12

const numberWithinRange = (number: number, min: number, max: number): number =>
	Math.min(Math.max(number, min), max)

type PropType = {
	slides: Sanity.Testimonial[]
	options?: EmblaOptionsType
	locale?: string
}

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
			if (value.style === 'h3') {
				return (
					<h3 className="font-semibold leading-tight text-cyan-950">
						{value.children.map((child: any) => child.text).join('')}
					</h3>
				)
			}
			return (
				<p className="text-larger mx-auto max-w-3xl font-semibold text-cyan-950 md:max-w-3xl">
					{value.children.map((child: any) => clean(child.text)).join('')}
				</p>
			)
		},
	},
}

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slides, options, locale } = props
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])
	const tweenFactor = useRef(0)
	const tweenNodes = useRef<HTMLElement[]>([])

	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi)

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi)

	const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
		tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
			return slideNode.querySelector('.slide-item') as HTMLElement
		})
	}, [])

	const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
		tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
	}, [])

	const tweenScale = useCallback(
		(emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
			const engine = emblaApi.internalEngine()
			const scrollProgress = emblaApi.scrollProgress()
			const slidesInView = emblaApi.slidesInView()
			const isScrollEvent = eventName === 'scroll'

			emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
				let diffToTarget = scrollSnap - scrollProgress
				const slidesInSnap = engine.slideRegistry[snapIndex]

				slidesInSnap.forEach((slideIndex) => {
					if (isScrollEvent && !slidesInView.includes(slideIndex)) return

					if (engine.options.loop) {
						engine.slideLooper.loopPoints.forEach((loopItem) => {
							const target = loopItem.target()

							if (slideIndex === loopItem.index && target !== 0) {
								const sign = Math.sign(target)

								if (sign === -1) {
									diffToTarget = scrollSnap - (1 + scrollProgress)
								}
								if (sign === 1) {
									diffToTarget = scrollSnap + (1 - scrollProgress)
								}
							}
						})
					}

					const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
					const scale = numberWithinRange(tweenValue, 0, 1).toString()
					const tweenNode = tweenNodes.current[slideIndex]
					tweenNode.style.transform = `scale(${scale})`
				})
			})
		},
		[],
	)

	useEffect(() => {
		if (!emblaApi) return

		setTweenNodes(emblaApi)
		setTweenFactor(emblaApi)
		tweenScale(emblaApi)

		emblaApi
			.on('reInit', setTweenNodes)
			.on('reInit', setTweenFactor)
			.on('reInit', tweenScale)
			.on('scroll', tweenScale)
			.on('slideFocus', tweenScale)
	}, [emblaApi, tweenScale])

	return (
		<div
			className={cn(style.embla, 'embla fluid-gap flex flex-col')}
			dir={locale == 'en' ? 'ltr' : 'rtl'}
		>
			<div
				className={cn(style.embla__viewport, 'embla__viewport')}
				ref={emblaRef}
			>
				<div className={cn(style.embla__container, 'embla__container')}>
					{slides.map(({ content, author }, index) => (
						<div className={cn(style.embla__slide, 'embla__slide')} key={index}>
							<div
								className={cn(
									style.slide_item,
									`slide-item flex flex-col items-center justify-center gap-8 rounded-2xl border border-gray-100 bg-teal-100 px-[var(--padding-horizontal--main)] py-[var(--size--4rem)] text-center transition-all`,
								)}
							>
								<PortableText value={content} components={components} />
								<div className="flex flex-row gap-4">
									<div
										className={cn(
											'flex flex-col text-sm text-cyan-950',
											author?.image ? 'items-start' : 'items-center',
										)}
									>
										<p className="font-medium">{clean(author.name)}</p>
										<p className="text-cyan-950/60">{clean(author.title)}</p>
									</div>
									<Img
										loading="lazy"
										image={author?.image}
										imageWidth={40}
										className="aspect-square h-auto w-full rounded-full object-cover object-left-top"
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div
				className="mx-auto flex w-full max-w-xs flex-row justify-between md:max-w-md lg:max-w-lg"
				dir={locale == 'en' ? 'ltr' : 'rtl'}
			>
				<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
				<div className={style.embla__dots}>
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={`${style.embla__dot} ${index === selectedIndex ? style['embla__dot--selected'] : ''}`}
						/>
					))}
				</div>
				<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
			</div>
		</div>
	)
}

export default EmblaCarousel
