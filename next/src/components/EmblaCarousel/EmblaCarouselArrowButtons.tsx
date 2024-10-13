import React, {
	ComponentPropsWithRef,
	useCallback,
	useEffect,
	useState,
} from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { PiCaretRightBold, PiCaretLeftBold } from '@/ui/Icons'
import style from './embla.module.css'
import { cn } from '@/lib/utils'

type UsePrevNextButtonsType = {
	prevBtnDisabled: boolean
	nextBtnDisabled: boolean
	onPrevButtonClick: () => void
	onNextButtonClick: () => void
}

export const usePrevNextButtons = (
	emblaApi: EmblaCarouselType | undefined,
	onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UsePrevNextButtonsType => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return
		emblaApi.scrollPrev()
		if (onButtonClick) onButtonClick(emblaApi)
	}, [emblaApi, onButtonClick])

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return
		emblaApi.scrollNext()
		if (onButtonClick) onButtonClick(emblaApi)
	}, [emblaApi, onButtonClick])

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev())
		setNextBtnDisabled(!emblaApi.canScrollNext())
	}, [])

	useEffect(() => {
		if (!emblaApi) return

		onSelect(emblaApi)
		emblaApi.on('reInit', onSelect).on('select', onSelect)
	}, [emblaApi, onSelect])

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	}
}

type PropType = ComponentPropsWithRef<'button'>

export const PrevButton: React.FC<PropType> = (props) => {
	const { children, ...restProps } = props

	return (
		<button
			className={cn(style.embla__button, 'embla__button embla__button--prev')}
			type="button"
			aria-label="previous"
			{...restProps}
		>
			<PiCaretLeftBold className="size-12 rtl:rotate-180" />
			{children}
		</button>
	)
}

export const NextButton: React.FC<PropType> = (props) => {
	const { children, ...restProps } = props

	return (
		<button
			className={cn(style.embla__button, 'embla__button embla__button--next')}
			type="button"
			aria-label="next"
			{...restProps}
		>
			<PiCaretRightBold className="size-12 rtl:rotate-180" />

			{children}
		</button>
	)
}
