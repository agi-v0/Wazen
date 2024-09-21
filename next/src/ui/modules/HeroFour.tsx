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
		<section className="cyan-gradient-background-2 relative flex min-h-screen flex-col gap-6 py-[20vh] lg:gap-12">
			<div className="relative mx-auto flex w-full max-w-screen-md flex-col items-center justify-center gap-6 px-[var(--padding-horizontal--main)] text-center">
				<Pretitle className="mb-2 text-base font-medium text-teal-500">
					{pretitle}
				</Pretitle>
				<PortableText value={content} components={set2} />
				<CTAList ctas={ctas} className="*:h-12 *:px-6 *:text-lg" />
			</div>
			<Image
				src={urlFor(image as Sanity.Image).url()}
				alt="hero"
				height={1194}
				width={1440}
				className="section relative mx-auto h-auto w-full object-cover object-left-top"
				draggable={false}
				loading="eager"
				priority
			/>
		</section>
	)
}
