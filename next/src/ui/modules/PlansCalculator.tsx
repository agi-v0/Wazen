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
	const [isMonthly, setIsMonthly] = useState(false)

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

				<section className="sticky top-[var(--header-height)] z-[2] flex w-full flex-row items-end justify-between bg-white">
					<div className="flex w-full flex-row justify-between">
						<div
							dir="ltr"
							className="flex h-24 w-full flex-row items-center justify-start gap-4 text-sm text-cyan-950/60 rtl:flex-row-reverse"
						>
							<Switch checked={isMonthly} onCheckedChange={setIsMonthly} />
							Annual (2 months free)
						</div>
						<div className="relative flex w-full flex-col items-end justify-center px-2">
							<div className="w-fit grow">
								<div className="pb-4 font-semibold">التكلفة التقديرية</div>
								<div className="mb-1">
									<h3 className="mb-2 text-[32px] font-bold text-black">
										<span className="amount">{total}</span>ريال
										<span className="text-lg font-light">
											/{isMonthly ? 'شهرياً' : 'سنوياً'}
										</span>
									</h3>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section>
					<CalculatorTable
						details={details}
						setTotal={setTotal}
						isMonthly={isMonthly}
					/>
				</section>
			</div>
		</div>
	)
}

export default PlansCalculator
