'use client'

import React, { useState } from 'react'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'

import CalculatorTable from '@/components/ui/modules/pricing/CalculatorTable'
import { Switch } from '@/components/ui/switch'

export default function PlansCalculator({
	content,
	details,
	locale,
}: Partial<{
	content: any
	details: any
	locale: string
}>) {
	const [isYearly, setIsYearly] = useState(false)
	const [total, setTotal] = useState<number>(0)

	const switchLabel =
		locale === 'en' ? 'Yearly (two months free)' : 'سنوي (شهرين مجاناً)'
	const SR = locale === 'en' ? 'SR' : 'ريال'
	const monthly = locale === 'en' ? 'monthly' : 'شهرياً'
	const yearly = locale === 'en' ? 'Yearly' : 'سنوياً'
	const estimatedPrice =
		locale === 'en' ? 'Estimated price' : 'التكلفة التقديرية'

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
					<p className="text-main font-semibold text-gray-400">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<div className="section py-24">
			<div className="fluid-gap flex w-full flex-col items-center">
				<PortableText value={content} components={components} />
			</div>

			<div className="container">
				{/* <!-- Column with labels --> */}

				<div className="sticky top-[var(--header-height)] z-[2] flex w-full flex-row items-end justify-between bg-white">
					<div className="flex flex-row items-center justify-center gap-4 px-2 py-4 text-sm font-medium text-gray-400 max-lg:flex-col max-lg:items-start rtl:flex-row-reverse rtl:max-lg:flex-col-reverse">
						<span>{switchLabel}</span>
						<Switch checked={isYearly} onCheckedChange={setIsYearly} />
					</div>
					<div className="relative flex flex-row items-center gap-4 px-2 py-4 max-lg:flex-col max-lg:items-start max-lg:gap-2">
						<span className="text-sm font-medium text-gray-400">
							{estimatedPrice}
						</span>
						<span className="text-larger inline-flex flex-row items-end gap-1 pt-1 font-semibold text-gray-950">
							<span className="amount">{total}</span>
							{SR}
							<span className="text-large font-medium text-gray-600">
								/{isYearly ? yearly : monthly}
							</span>
						</span>
					</div>
				</div>
				<CalculatorTable
					details={details}
					setTotal={setTotal}
					isYearly={isYearly}
					locale={locale as string}
				/>
			</div>
		</div>
	)
}
