'use client'

import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { stegaClean } from '@sanity/client/stega'
import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import { PiCaretLeftBold } from 'react-icons/pi'
import Img from '../Img'
import { motion, useInView, stagger } from 'framer-motion'
import { useRef } from 'react'

export default function ProductList({
	pretitle,
	content,
	textAlign = 'center',
	products,
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	products: [
		{
			productImage: any
			productTitle: string
			productDescription: string
			link: Sanity.Link
		},
	]
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 font-semibold leading-tight text-cyan-950">
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

	const ref = useRef(null)
	const isInView = useInView(ref)

	return (
		<section className={'bg-gradient-to-t from-teal-50 to-white'}>
			<div
				className={'section fluid-gap flex w-full flex-col items-center py-12'}
			>
				<div
					className={'flex flex-col items-center gap-8'}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<Pretitle className={'text-large font-semibold text-gray-400'}>
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={components} />
				</div>
				{products && (
					<ul
						ref={ref}
						className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
					>
						{products.map((product, index) => (
							<motion.li
								key={product.productTitle}
								initial="hidden"
								animate={isInView ? 'visible' : 'hidden'}
								variants={{
									hidden: { y: 20, opacity: 0 },
									visible: { y: 0, opacity: 1 },
								}}
								transition={{ type: 'easeOut', delay: index * 0.2 }}
								className="group z-[5] flex flex-col rounded-xl p-2 transition-all hover:bg-white hover:shadow-md"
							>
								<Link
									href={processUrl(product.link.internal as Sanity.PageBase, {
										base: false,
										params: product.link.params,
									})}
								>
									<div className="grid w-full place-items-center overflow-hidden rounded-lg bg-gradient-to-tr from-teal-900 to-teal-300 px-2 py-8">
										<Img
											image={product.productImage}
											alt={product.productTitle}
											width={100}
											height={100}
											className="my-auto h-auto w-full object-scale-down object-center"
										/>
									</div>
									<div className="space-y-1 p-4 text-start">
										<h3 className="text-main font-semibold group-hover:text-teal-600">
											{product.productTitle}
											<PiCaretLeftBold className="inline-block size-4 translate-x-0 text-teal-600/50 opacity-0 transition-transform duration-150 group-hover:-translate-x-1 group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1" />
										</h3>
										<p className="text-small text-gray-600">
											{product.productDescription}
										</p>
									</div>
								</Link>
							</motion.li>
						))}
					</ul>
				)}
			</div>
		</section>
	)
}
