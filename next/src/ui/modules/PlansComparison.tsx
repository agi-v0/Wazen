'use client'

import React, { useState } from 'react'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'

const PlansComparison = ({
	content,
	details,
}: Partial<{
	content: any
	details: any
}>) => {
	const [isMonthly, setIsMonthly] = useState(true)

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

			<div className="py-20 overflow-x-auto">
				{/* <!-- Column with labels --> */}

				<section className="flex flex-row justify-between w-full">
					<div className="px-2 w-full">
						<div className="flex h-full items-end justify-center py-6">
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
					<div className="relative flex flex-col justify-end w-full px-2">
						<div className="grow">
							<div className="pb-4 font-semibold">المجانية</div>
							<div className="mb-1">
								<h3 className="mb-2 text-[32px] font-bold text-black">
									<span className="amount">{0}</span>ريال
									<span className="text-lg font-light">
										/{isMonthly ? 'شهرياً' : 'سنوياً'}
									</span>
								</h3>
							</div>
						</div>
						<div className="my-6 rounded-md border-2 border-teal-500/20">
							<button className="bg-primary hover:shadow-signUp flex w-full items-center justify-center rounded-sm p-3 text-base font-semibold transition duration-300 ease-in-out hover:bg-opacity-80">
								إبدأ تجربتك المجانية
							</button>
						</div>
					</div>
					<div className="relative flex flex-col justify-end w-full px-2">
						<div className="grow">
							<div className="pb-4 font-semibold">الأساسية</div>
							<div className="mb-1">
								<h3 className="mb-2 text-[32px] font-bold text-black">
									<span className="amount">{isMonthly ? 350 : 1000}</span>ريال
									<span className="text-lg font-light">
										/{isMonthly ? 'شهرياً' : 'سنوياً'}
									</span>
								</h3>
							</div>
						</div>
						<div className="my-6 rounded-md border-2 border-teal-500/20">
							<button className="bg-primary hover:shadow-signUp flex w-full items-center justify-center rounded-sm p-3 text-base font-semibold transition duration-300 ease-in-out hover:bg-opacity-80">
								إبدأ تجربتك المجانية
							</button>
						</div>
					</div>
					<div className="relative flex flex-col justify-end w-full px-2">
						<div className="grow">
							<div className="pb-4 font-semibold">المتقدمة</div>
							<div className="mb-1">
								<h3 className="mb-2 text-[32px] font-bold text-black">
									<span className="amount">{isMonthly ? 450 : 2100}</span>ريال
									<span className="text-lg font-light">
										/{isMonthly ? 'شهرياً' : 'سنوياً'}
									</span>
								</h3>
							</div>
						</div>
						<div className="my-6 rounded-md border-2 border-teal-500/20">
							<button className="bg-primary hover:shadow-signUp flex w-full items-center justify-center rounded-sm p-3 text-base font-semibold transition duration-300 ease-in-out hover:bg-opacity-80">
								إبدأ تجربتك المجانية
							</button>
						</div>
					</div>
				</section>

				<section>
					<div>
						{details?.map((detail: any, index: any) => (
							<div key={'details_' + index}>
								<div
									className="flex flex-col justify-end bg-gray-50 rounded-md px-6 py-2 max-md:hidden md:order-1"
									aria-hidden="true"
								>
									{detail.title}
								</div>
								<div
									className="py-2 text-gray-600"
									dir="ltr"
								>
									{detail.specs?.rows?.map((row: any, index: any) => (
										<div
											key={'rows_' + index}
											className="flex flex-row justify-between"
										>
											{row.cells.map((cell: any, index: any) => (
												<div
													key={'cell_' + index}
													className="flex w-full flex-wrap justify-end px-6 py-2"
												>
													{cell}
												</div>
											))}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	)
}

export default PlansComparison
