import { PortableText } from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import CTAList from '@/ui/CTAList'
import Img from '@/ui/Img'
import { set2 } from '@/components/ui/portable-text'

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
			<Img
				image={image}
				alt={image?.alt}
				imageWidth={3000}
				className="section relative mx-auto h-auto w-full object-cover object-left-top"
				draggable={false}
				fetchPriority="high"
				loading="eager"
			/>
		</section>
	)
}
