import {
	useNextSanityImage,
	type UseNextSanityImageOptions,
} from 'next-sanity-image'
import { ImageFormat } from '@sanity/image-url/lib/types/types'
import client from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/urlFor'

const SIZES = [
	60, 120, 240, 360, 480, 640, 720, 960, 1200, 1440, 1920, 2560, 3000,
]

type ImageProps = {
	svg?: boolean
	format?: ImageFormat
	image: Sanity.Image | undefined
	imageWidth?: number
	className?: string
	imageSizes?: number[]
	alt?: string
	options?: UseNextSanityImageOptions
} & React.ImgHTMLAttributes<HTMLImageElement>

type SourceProps = Omit<ImageProps, 'className' | 'alt'> & {
	media?: string
}

function generateSrcSet(
	image: Sanity.Image,
	format: ImageFormat,
	svg: boolean,
	width?: number,
	sizes: number[] = SIZES,
): string | undefined {
	if (!image) return undefined

	const filteredSizes = sizes.filter((size) => !width || size <= width)
	const urlGenerator = (size: number) => {
		let imageUrl = urlFor(image).width(size).auto('format')
		if (!svg) {
			imageUrl = imageUrl.format(format)
		}
		return `${imageUrl.url()} ${size}w`
	}

	return filteredSizes.map(urlGenerator).join(', ')
}

export default function Img({
	svg = false,
	format = 'webp',
	image,
	imageWidth,
	className,
	imageSizes = SIZES,
	alt = '',
	options,
	...props
}: ImageProps) {
	const imageProps = useNextSanityImage(client, image || {})

	if (!image?.asset) return null

	const { src, width, height } = imageProps
	const finalWidth = imageWidth || width
	const finalHeight = imageWidth
		? Math.round((imageWidth / width) * height)
		: height

	const srcSet = generateSrcSet(image, format, svg, finalWidth, imageSizes)

	return (
		<img
			src={src}
			srcSet={srcSet}
			width={finalWidth}
			height={finalHeight}
			className={className}
			alt={image.alt || alt}
			loading={image.loading || 'lazy'}
			decoding="async"
			{...props}
		/>
	)
}

export function Source({
	svg = false,
	format = 'webp',
	image,
	imageWidth,
	imageSizes = SIZES,
	options,
	media = '(max-width: 768px)',
}: SourceProps) {
	const imageProps = useNextSanityImage(client, image || {})

	if (!image) return null

	const { src, width, height } = imageProps
	const finalWidth = imageWidth || width
	const finalHeight = imageWidth
		? Math.round((imageWidth / width) * height)
		: height

	const srcSet =
		generateSrcSet(image, format, svg, finalWidth, imageSizes) || src

	return (
		<source
			srcSet={srcSet}
			width={finalWidth}
			height={finalHeight}
			media={media}
		/>
	)
}
