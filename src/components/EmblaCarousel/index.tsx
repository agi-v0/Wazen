'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import {
	NextButton,
	PrevButton,
	usePrevNextButtons,
} from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'

const TWEEN_FACTOR_BASE = 0.12

const numberWithinRange = (number: number, min: number, max: number): number =>
	Math.min(Math.max(number, min), max)

type EmblaCarouselClientProps = {
	children: React.ReactNode
	options?: EmblaOptionsType
	locale?: string
}

const EmblaCarouselClient: React.FC<EmblaCarouselClientProps> = ({
	children,
	options,
	locale = 'en',
}) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ active: false }),
	])
	const tweenFactor = useRef(0)
	const tweenNodes = useRef<HTMLElement[]>([])

	const setTweenNodes = useCallback((api: EmblaCarouselType): void => {
		tweenNodes.current = api
			.slideNodes()
			.map((slideNode) => slideNode.querySelector('.slide-item') as HTMLElement)
	}, [])

	const setTweenFactor = useCallback((api: EmblaCarouselType) => {
		tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
	}, [])

	const tweenScale = useCallback(
		(api: EmblaCarouselType, eventName?: string) => {
			const engine = api.internalEngine()
			const scrollProgress = api.scrollProgress()
			const slidesInView = api.slidesInView()
			const isScrollEvent = eventName === 'scroll'

			api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
				engine.slideRegistry[snapIndex].forEach((slideIndex) => {
					if (isScrollEvent && !slidesInView.includes(slideIndex)) return
					let diffToTarget = scrollSnap - scrollProgress

					if (engine.options.loop) {
						engine.slideLooper.loopPoints.forEach((loopItem) => {
							const target = loopItem.target()

							if (slideIndex === loopItem.index && target !== 0) {
								diffToTarget =
									scrollSnap + Math.sign(target) * (1 - scrollProgress)
							}
						})
					}

					const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
					const scale = numberWithinRange(tweenValue, 0, 1).toString()
					const node = tweenNodes.current[slideIndex]

					if (node) {
						node.style.transform = `scale(${scale})`
					}
				})
			})
		},
		[],
	)

	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi)

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi)

	useEffect(() => {
		if (!emblaApi) return

		setTweenNodes(emblaApi)
		setTweenFactor(emblaApi)
		tweenScale(emblaApi)

		const handleScroll = () => tweenScale(emblaApi, 'scroll')

		emblaApi
			.on('reInit', setTweenNodes)
			.on('reInit', setTweenFactor)
			.on('reInit', tweenScale)
			.on('scroll', handleScroll)
			.on('slideFocus', tweenScale)

		return () => {
			emblaApi.off('reInit', setTweenNodes)
			emblaApi.off('reInit', setTweenFactor)
			emblaApi.off('reInit', tweenScale)
			emblaApi.off('scroll', handleScroll)
			emblaApi.off('slideFocus', tweenScale)
		}
	}, [emblaApi, setTweenFactor, setTweenNodes, tweenScale])

	return (
		<div
			className="embla fluid-gap flex flex-col"
			dir={locale === 'en' ? 'ltr' : 'rtl'}
		>
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">{children}</div>
			</div>

			<div
				className="mx-auto flex w-full max-w-xs flex-row justify-between md:max-w-md lg:max-w-lg"
				dir={locale === 'en' ? 'ltr' : 'rtl'}
			>
				<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
				<div className="embla__dots">
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={`embla__dot ${
								index === selectedIndex ? 'embla__dot--selected' : ''
							}`}
						/>
					))}
				</div>
				<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
			</div>
		</div>
	)
}

export default EmblaCarouselClient
