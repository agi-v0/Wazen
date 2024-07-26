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

const TWEEN_FACTOR_BASE = 0.52

const numberWithinRange = (number: number, min: number, max: number): number =>
	Math.min(Math.max(number, min), max)

type PropType = {
	slides: {
		title: string
		description: string
		link: Sanity.Link
		image: Sanity.Image
	}[]
	options?: EmblaOptionsType
	locale?: string
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
			className="embla fluid-gap flex flex-col"
			dir={locale == 'en' ? 'ltr' : 'rtl'}
		>
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{slides.map(({ title, link, image }, index) => (
						<div className="embla__slide" key={index}>
							<div
								className={`slide-item flex flex-col items-center justify-start rounded-lg border border-gray-100 bg-gradient-to-br from-white to-indigo-50 p-3 text-start transition-all md:flex-row md:justify-between`}
							>
								<div className="flex h-full w-full flex-col justify-between p-6 max-md:gap-4">
									<h3 className="h4 font-semibold">{title}</h3>
									<p className="text-base text-gray-950/60">
										{link.description}
									</p>
									<div className="mt-6">
										<span className="link flex items-center gap-1 text-teal-600 no-underline">
											{link.label}
											<PiCaretRightBold className="size-3 rotate-180 text-teal-600" />
										</span>
									</div>
								</div>
								<div className="h-auto w-full rounded-lg md:max-w-[50%]">
									<Img
										image={image}
										imageWidth={300}
										className="aspect-[3/4] h-auto w-full rounded-md object-cover object-left-top"
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
				<div className="embla__dots">
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
						/>
					))}
				</div>
				<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />

				{/* <div className="embla__dots">
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
						/>
					))}
				</div> */}
			</div>
		</div>
	)
}

export default EmblaCarousel
