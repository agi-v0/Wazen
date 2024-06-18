import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'
import Img from '../Img'
import { cn } from '@/lib/utils'

export default function TestimonialList({
	content,
	testimonials,
}: Partial<{
	content: any
	testimonials: Sanity.Testimonial[]
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-main mx-auto max-w-xl text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}
	return (
		<section className="section space-y-8 py-12 text-center">
			{content && (
				<header className="richtext">
					<PortableText value={content} components={components} />
				</header>
			)}

			<div className="carousel max-xl:full-bleed overflow-fade items-center gap-x-8 before:m-auto after:m-auto">
				{testimonials?.map(({ author, ...testimonial }, key) => (
					<article className="!basis-[min(450px,70vw)]" key={key}>
						<blockquote className="space-y-6">
							<div className="richtext text-balance">
								<PortableText value={testimonial.content} />
							</div>

							{author && (
								<footer>
									<cite>
										<div className="inline-flex items-center gap-2">
											<Img
												className="size-[40px] rounded-full object-cover"
												image={author?.image}
												imageWidth={80}
											/>
											<div className={cn(author?.image && 'text-left')}>
												<div>{author?.name}</div>
												{author?.title && (
													<div className="text-sm">{author?.title}</div>
												)}
											</div>
										</div>
									</cite>
								</footer>
							)}
						</blockquote>
					</article>
				))}
			</div>
		</section>
	)
}
