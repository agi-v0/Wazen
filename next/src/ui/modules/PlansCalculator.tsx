'use client'

import React, { useState } from 'react'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'

import CalculatorTable from '@/components/Pricing/CalculatorTable'
import { Switch } from '@/components/ui/switch'

const PlansCalculator = ({
	content,
	details,
}: Partial<{
	content: any
	details: any
}>) => {
	const [isYearly, setIsYearly] = useState(false)

	const [total, setTotal] = useState<number>(0)

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
					<div className="flex w-full flex-row justify-between">
						<div className="flex flex-row items-center justify-center gap-4 px-2 py-4 text-sm font-medium text-gray-400 max-lg:flex-col max-lg:items-start rtl:flex-row-reverse rtl:max-lg:flex-col-reverse">
							<span>سنوي (شهرين مجاناً)</span>
							<Switch checked={isYearly} onCheckedChange={setIsYearly} />
						</div>
						<div className="relative flex flex-row items-center gap-4 px-2 py-4 max-lg:flex-col max-lg:items-start max-lg:gap-2">
							<span className="text-sm font-medium text-gray-400">
								التكلفة التقديرية
							</span>
							<span className="text-larger inline-flex flex-row items-end gap-1 pt-1 font-semibold text-gray-950">
								<span className="amount">{total}</span>ريال
								<span className="text-large font-medium text-gray-600">
									/{isYearly ? 'سنوياً' : 'شهرياً'}
								</span>
							</span>
						</div>
					</div>
				</div>
				<div>
					<CalculatorTable
						details={details}
						setTotal={setTotal}
						isYearly={isYearly}
					/>
				</div>
			</div>
		</div>
	)
}

export default PlansCalculator
