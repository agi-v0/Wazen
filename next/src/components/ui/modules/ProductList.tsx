import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/components/ui/Pretitle'
import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import { PiCaretLeftBold } from '@/components/ui/Icons'
import Img from '../Img'
import { cn } from '@/lib/utils'

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
	const hoverColors = [
		'group-hover:bg-teal-100',
		'group-hover:bg-yellow-100',
		'group-hover:bg-indigo-100',
		'group-hover:bg-cyan-100',
	]

	return (
		<section className={'fluid-vertical-space bg-white'}>
			<div
				className={'section fluid-gap flex w-full flex-col items-center py-12'}
			>
				<div
					className={
						'mb-12 flex w-full max-w-4xl flex-col items-center gap-8 text-center'
					}
				>
					<Pretitle className="text-large font-semibold text-gray-400">
						{pretitle}
					</Pretitle>
					<PortableText value={content} components={components} />
				</div>
				{products && (
					<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
						{products.map((product, index) => (
							<li
								key={product.productTitle}
								className="group z-[5] flex flex-col rounded-xl p-2 transition-all hover:bg-white hover:shadow-md"
							>
								<Link
									href={processUrl(product.link.internal as Sanity.PageBase, {
										base: false,
										params: product.link.params,
									})}
								>
									<Img
										image={product.productImage}
										alt={product.productTitle}
										width={100}
										height={100}
										className={cn(
											'my-auto grid h-auto w-full place-items-center overflow-hidden rounded-xl bg-cyan-950/20 object-scale-down object-center px-4 py-6',
											hoverColors[index],
										)}
										loading="lazy"
									/>
									<div className="space-y-1 p-4 text-start">
										<h3 className="text-main font-semibold group-hover:text-teal-600">
											{product.productTitle}
											<PiCaretLeftBold className="inline-block size-3 translate-x-0 text-teal-600/50 opacity-0 transition-transform duration-150 group-hover:-translate-x-1 group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1" />
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
