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
import { PiCaretRightBold } from 'react-icons/pi'
import Img from '../Img'

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
		<section className={'section grid *:col-span-full *:row-span-full'}>
			<div className={'fluid-gap flex w-full flex-col items-center'}>
				<div
					className={'flex flex-col items-center gap-8'}
					style={{ textAlign: stegaClean(textAlign) }}
				>
					<Pretitle className={'py-1 text-4xl text-gray-400'}>
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={components} />
				</div>
				{products && (
					<ul className="fluid-gap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
						{products.map((product) => (
							<li
								key={product.productTitle}
								className="flex flex-col rounded-2xl bg-teal-50 p-2 shadow-md"
							>
								<Link
									href={processUrl(product.link.internal as Sanity.PageBase, {
										base: false,
										params: product.link.params,
									})}
								>
									<div className="grid aspect-square w-full place-items-center overflow-hidden rounded-lg bg-gradient-to-tr from-teal-900 to-teal-300 p-2">
										<Img
											image={product.productImage}
											alt={product.productTitle}
											width={100}
											height={100}
											className="my-auto h-auto w-full object-scale-down object-center"
										/>
									</div>
									<div className="space-y-1 p-4 text-start">
										<h3 className="text-main font-semibold">
											{product.productTitle}
										</h3>
										<p className="text-small text-gray-600">
											{product.productDescription}
										</p>
									</div>
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	)
}