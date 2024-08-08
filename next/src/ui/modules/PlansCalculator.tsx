'use client'

import React, { useState } from 'react'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'

import CalculatorTable from '@/components/Pricing/CalculatorTable'

const PlansCalculator = ({
	content,
	details,
}: Partial<{
	content: any
	details: any
}>) => {
	const [isMonthly, setIsMonthly] = useState(true)

	const [total, setTotal] = useState(0)

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

			<div className="overflow-x-auto py-20">
				{/* <!-- Column with labels --> */}

				<section className="flex w-full flex-row justify-between">
					<div className="w-full px-2">
						<div className="flex h-full items-end justify-start py-6">
							<div className="flex justify-between rounded-md bg-gray-50">
								<span
									onClick={() => setIsMonthly(true)}
									className={`${
										isMonthly
											? 'pointer-events-none border-2 border-teal-500/20 bg-teal-50 text-teal-600'
											: 'text-gray-600'
									} cursor-pointer rounded-md px-8 py-3 text-base font-semibold`}
								>
									شهري
								</span>
								<span
									onClick={() => setIsMonthly(false)}
									className={`${
										isMonthly
											? 'text-gray-600'
											: 'pointer-events-none border-2 border-teal-500/20 bg-teal-50 text-teal-600'
									} cursor-pointer rounded-md px-8 py-3 text-base font-semibold`}
								>
									سنوي
								</span>
							</div>
						</div>
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
				</section>

				<section>
					<CalculatorTable
						details={details}
						total={total}
						setTotal={setTotal}
					/>
				</section>
			</div>
		</div>
	)
}

export default PlansCalculator
