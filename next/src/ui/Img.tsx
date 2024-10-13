import {
	useNextSanityImage,
	type UseNextSanityImageOptions,
} from 'next-sanity-image'
import client from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/urlFor'
import { stegaClean } from '@sanity/client/stega'
import { ImageFormat } from '@sanity/image-url/lib/types/types'

const SIZES = [
	60, 120, 240, 360, 480, 640, 720, 960, 1200, 1440, 1920, 2560, 3000,
]

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
}: {
	svg?: Boolean
	format?: ImageFormat
	image: Sanity.Image | undefined
	imageWidth?: number
	className?: string
	imageSizes?: number[]
	options?: UseNextSanityImageOptions
} & React.ImgHTMLAttributes<HTMLImageElement>) {
	if (!image?.asset) return null

	const { src, width, height } = useNextSanityImage(
		client,
		image,
		imageWidth ? { imageBuilder: (b) => b.width(imageWidth) } : options,
	)

	return (
		<img
			src={src}
			srcSet={generateSrcSet(image, format, svg, {
				width: imageWidth,
				sizes: imageSizes,
			})}
			width={width}
			className={className}
			height={height}
			alt={image.alt || alt}
			loading={stegaClean(image.loading) || 'lazy'}
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
}: {
	svg?: Boolean
	format?: ImageFormat
	image: Sanity.Image | undefined
	imageWidth?: number
	imageSizes?: number[]
	options?: UseNextSanityImageOptions
	media?: string
}) {
	if (!image) return null
	const { src, width, height } = useNextSanityImage(
		client,
		image,
		imageWidth ? { imageBuilder: (b) => b.width(imageWidth) } : options,
	)

	return (
		<source
			srcSet={
				generateSrcSet(image, format, svg, {
					width: imageWidth,
					sizes: imageSizes,
				}) || src
			}
			width={width}
			height={height}
			media={media}
		/>
	)
}

function generateSrcSet(
	image: Sanity.Image,
	format: ImageFormat,
	svg: Boolean,
	{
		width,
		sizes = SIZES,
	}: {
		width?: number
		sizes: number[]
	},
) {
	// call format method only if the value of svg is false, useful for displaying svgs
	return !svg
		? sizes
				.filter((size) => !width || size <= width)
				.map(
					(size) =>
						`${urlFor(image)
							.width(size)
							.auto('format')
							.format(format)
							.url()} ${size}w`,
				)
				.join(', ') || undefined
		: sizes
				.filter((size) => !width || size <= width)
				.map(
					(size) =>
						`${urlFor(image).width(size).auto('format').url()} ${size}w`,
				)
				.join(', ') || undefined
}
