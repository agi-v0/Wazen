import { PortableText } from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import CTAList from '@/ui/CTAList'
import Img from '@/ui/Img'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { hero, set2 } from '@/components/ui/portable-text'
import { urlFor } from '@/lib/sanity/urlFor'

export default function HeroPostcard({
	pretitle,
	content,
	ctas,
	image,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	image: Sanity.Image & { onRight?: boolean }
}>) {
	return (
		<section className="relative flex min-h-screen flex-col gap-6 py-[20vh] lg:gap-12">
			<div className="section relative flex w-full flex-col items-center justify-center gap-6 text-center">
				<Pretitle className="rounded-full border-2 border-green-500/40 px-6 py-2 text-base font-medium text-teal-500">
					{pretitle}
				</Pretitle>
				<PortableText value={content} components={set2} />
				<CTAList ctas={ctas} className="*:h-12 *:px-6 *:text-lg" />
			</div>
			<figure className="section relative">
				<Image
					src={urlFor(image as Sanity.Image).url()}
					alt="hero"
					height={1194}
					width={1440}
					className="mx-auto h-auto w-full object-cover object-left-top"
					draggable={false}
					loading="eager"
					priority
				/>
			</figure>
			<svg
				width="1280"
				height="1147"
				viewBox="0 0 1280 1147"
				fill="none"
				className="pointer-events-none absolute bottom-0 left-0 right-0 z-[-1] h-auto w-full"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g className="mix-blend-darken">
					<circle
						cx="1026.46"
						cy="678.78"
						r="418.229"
						fill="url(#paint0_radial_7152_34516)"
					/>
				</g>
				<g className="mix-blend-darken">
					<circle
						cx="1053.73"
						cy="418.229"
						r="418.229"
						fill="url(#paint1_radial_7152_34516)"
					/>
				</g>
				<g className="mix-blend-darken">
					<circle
						cx="249.999"
						cy="727.928"
						r="418.229"
						fill="url(#paint2_radial_7152_34516)"
					/>
				</g>
				<defs>
					<radialGradient
						id="paint0_radial_7152_34516"
						cx="0"
						cy="0"
						r="1"
						gradientUnits="userSpaceOnUse"
						gradientTransform="translate(1026.46 678.78) rotate(90) scale(418.229)"
					>
						<stop stopColor="#CCFBF1" />
						<stop offset="1" stopColor="white" stopOpacity="0" />
					</radialGradient>
					<radialGradient
						id="paint1_radial_7152_34516"
						cx="0"
						cy="0"
						r="1"
						gradientUnits="userSpaceOnUse"
						gradientTransform="translate(1053.73 418.229) rotate(90) scale(418.229)"
					>
						<stop stopColor="#ECFEFF" />
						<stop offset="1" stopColor="white" stopOpacity="0" />
					</radialGradient>
					<radialGradient
						id="paint2_radial_7152_34516"
						cx="0"
						cy="0"
						r="1"
						gradientUnits="userSpaceOnUse"
						gradientTransform="translate(249.999 727.928) rotate(90) scale(418.229)"
					>
						<stop stopColor="#EDE9FE" />
						<stop offset="1" stopColor="white" stopOpacity="0" />
					</radialGradient>
				</defs>
			</svg>
		</section>
	)
}
