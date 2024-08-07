'use client'

import React, { useState } from 'react'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import { stegaClean } from '@sanity/client/stega'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { PiCheckCircle, PiXBold } from 'react-icons/pi'

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

				<div className="container">
					{/* <!-- Column with labels --> */}

					<div className="sticky top-[var(--header-height)] z-[2] flex w-full flex-row items-end justify-between bg-white">
						<div className="flex w-full flex-col items-start justify-end px-2 py-4">
							<div
								dir="ltr"
								className="flex h-12 w-full flex-row items-center justify-center gap-4 text-sm text-cyan-950/60 rtl:flex-row-reverse"
							>
								<Switch checked={isMonthly} onCheckedChange={setIsMonthly} />
								Annual (2 months free)
							</div>
						</div>
						{details[0].specs.rows.map(
							(row: { cells: string[] }, index: string) => {
								return (
									<div
										className="relative flex w-full flex-col gap-4 px-2 py-4"
										key={row.cells[2]}
									>
										<div className="flex flex-col items-start justify-between">
											<h3 className="text-xl font-semibold text-gray-900">
												{row.cells[2]}
											</h3>
											{/* <p className="text-base text-gray-600">description</p> */}
										</div>
										<p className="inline-flex flex-row items-end gap-1 pt-4 text-3xl font-semibold text-gray-950">
											<span className="amount">
												{' '}
												{isMonthly ? row.cells[0] : row.cells[1]}
											</span>
											ريال
											<span className="text-lg font-semibold text-gray-400">
												{' '}
												/{isMonthly ? 'شهرياً' : 'سنوياً'}
											</span>
										</p>
										<button
											className={cn(
												'h-12 w-full',
												index == '1' ? 'secondary' : 'tertiary',
											)}
										>
											إبدأ تجربتك المجانية
										</button>
									</div>
								)
							},
						)}
					</div>
					<div className="mt-9 flex flex-col gap-9">
						{details?.slice(1).map((detail: any, index: any) => (
							<div key={'details_' + index} className="">
								<h3
									className="text-main sticky top-[calc(var(--header-height)+192px)] z-[1] flex flex-col justify-end rounded-2xl bg-teal-100 p-[var(--text-main--font-size)] font-semibold max-md:hidden md:order-1"
									aria-hidden="true"
								>
									{detail.title}
								</h3>
								<div className="text-gray-800" dir="ltr">
									{detail.specs?.rows?.map((row: any, index: any) => (
										<div
											key={'rows_' + index}
											className="flex flex-row justify-between border-b border-gray-200"
										>
											{row.cells.map((cell: string, index: any) => {
												const cleanedCell = stegaClean(cell)
												console.log(index)
												switch (cleanedCell) {
													case '-':
														return (
															<div
																key={'cell_' + index}
																id={'cell_' + index}
																className={cn(
																	'flex w-full flex-wrap items-center justify-end px-6 py-3 text-end',
																	index == 1
																		? 'bg-teal-100 text-cyan-950/80'
																		: '',
																)}
															>
																<PiXBold className="text-sm text-gray-400" />
															</div>
														)
													case '✓​​​​‌‍​‍​‍‌‍‌​‍‌‍‍‌‌‍‌‌‍‍‌‌‍‍​‍​‍​‍‍​‍​‍‌​‌‍​‌‌‍‍‌‍‍‌‌‌​‌‍‌​‍‍‌‍‍‌‌‍​‍​‍​‍​​‍​‍‌‍‍​‌​‍‌‍‌‌‌‍‌‍​‍​‍​‍‍​‍​‍‌‍‍​‌‌​‌‌​‌​​​‍‍​​​​​‌':
														return (
															<div
																key={'cell_' + index}
																className="flex w-full flex-wrap justify-end px-6 py-2 text-end text-sm text-teal-500"
															>
																<PiCheckCircle />
															</div>
														)
													default:
														return (
															<div
																key={'cell_' + index}
																className={cn(
																	'flex w-full flex-wrap items-center justify-end px-6 py-3 text-end',

																	index == 1
																		? 'bg-teal-100 text-cyan-950/80'
																		: '',
																)}
															>
																{cell}
															</div>
														)
												}
											})}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PlansComparison
