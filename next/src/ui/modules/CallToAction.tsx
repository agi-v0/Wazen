import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import Image from 'next/image'
import { PiCheckCircle } from 'react-icons/pi'
import { urlFor } from '@/lib/sanity/urlFor'
import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { getLocale } from 'next-intl/server'
import { useLocale } from 'next-intl'

// https://magicui.design/docs/components/neon-gradient-card

export default async function CallToAction({
	content,
	ctas,
	image,
	checkedList,
	textAlign = 'start',
	alignItems,
	// callToAction,
}: Partial<{
	content: any
	ctas: Sanity.CTA[]
	checkedList: any
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
	image: Sanity.Image & { onRight?: boolean }
	callToAction: {
		content: any
		ctas: Sanity.CTA[]
		checkedList: any
		image: Sanity.Image & { onRight?: boolean }
	}
}>) {
	const locale = await getLocale()
	const ctaDoc = await fetchSanity<Sanity.Module>(
		groq`*[_type == 'call.to.action.doc' && language == $locale][0]{
		
			...,
			image{
				...,
				asset->
			},}
		`,
		{
			params: {
				locale: locale,
			},
			tags: ['apps'],
		},
	)
	console.log(ctaDoc.image.asset.url)

	const callToAction = ctaDoc

	content && (callToAction.content = content)
	ctas && (callToAction.ctas = content)
	checkedList && (callToAction.checkedList = checkedList)
	// image?.asset && (callToAction.image = image)

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				} else if (value.style === 'h3') {
					return (
						<p className="text-large font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</p>
					)
				}
				return (
					<p className="text-main max-w-xl text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	const checkedListComponents: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				const textContent = value.children
					.map((child: any) => child.text)
					.join('')
				if (!textContent.trim()) return null // Do not render if text content is empty or just whitespace

				return (
					<div className="flex items-center gap-2">
						<PiCheckCircle className="h-4 w-4 text-gray-400" />
						<p className="text-small text-gray-400">{textContent}</p>
					</div>
				)
			},
		},
	}

	return (
		<section className="section fluid-padding">
			<div
				className={cn(
					'fluid-gap fluid-padding -cyan-gradient-background-1 relative flex w-full flex-col items-center justify-evenly overflow-hidden rounded-2xl bg-cyan-50 lg:flex-row lg:justify-start',
					callToAction.image?.onRight
						? ''
						: 'lg:flex-row-reverse lg:justify-between',
				)}
			>
				<div className="relative aspect-square w-full overflow-hidden rounded-2xl border-8 border-white bg-teal-500 lg:max-w-[400px]">
					<div
						className={cn('absolute start-8 top-8 h-full w-full min-w-[800px]')}
					>
						<Image
							src={urlFor(callToAction.image as Sanity.Image).url()}
							alt={image?.alt as string}
							height={455.11}
							width={640}
							className="mx-auto h-auto w-full rounded-lg object-cover object-left-top shadow-lg"
							draggable={false}
							loading="lazy"
						/>
					</div>
				</div>
				<div className="flex max-w-2xl flex-col items-start gap-8">
					<PortableText value={callToAction.content} components={components} />

					<CTAList
						ctas={callToAction.ctas}
						className="w-full *:h-12 *:text-base"
					/>
					<div className="flex flex-col gap-2">
						<PortableText
							value={callToAction.checkedList}
							components={checkedListComponents}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
