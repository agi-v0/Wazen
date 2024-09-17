'use client'

import React, { useState } from 'react'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import { stegaClean } from '@sanity/client/stega'
import { Switch } from '@/components/ui/switch'
import { clean, cn } from '@/lib/utils'
import { PiCheckCircle, PiXBold } from 'react-icons/pi'
import { set2 } from '@/components/ui/portable-text'

const PlansComparison = ({
	content,
	details,
}: Partial<{
	content: any
	details: any
}>) => {
	const [isYearly, setIsYearly] = useState(true)

	return (
		<div className="section py-24">
			<div className="fluid-gap flex w-full flex-col items-center">
				<PortableText value={content} components={set2} />

				<div className="container">
					{/* <!-- table header (prices) --> */}

					<div className="sticky top-[var(--header-height)] z-[2] flex w-full flex-row items-end justify-between bg-white *:w-full max-lg:hidden max-lg:w-fit *:max-lg:w-48">
						<div className="flex flex-col items-start justify-end px-2 py-4">
							<div className="flex h-12 w-full flex-row items-center justify-center gap-4 text-sm font-medium text-gray-400 rtl:flex-row-reverse">
								سنوي (شهرين مجاناً)
								<Switch checked={isYearly} onCheckedChange={setIsYearly} />
							</div>
						</div>
						{details[0].specs.rows.map(
							(row: { cells: string[] }, index: string) => {
								return (
									<div
										className="relative flex flex-col gap-4 px-2 py-4"
										key={row.cells[2]}
									>
										<div className="flex flex-col items-start justify-between">
											<h3 className="text-sm font-medium text-gray-600">
												{row.cells[2]}
											</h3>
											{/* <p className="text-base text-gray-600">description</p> */}
										</div>
										<p className="h5 inline-flex flex-row items-end gap-1 pt-1 font-semibold text-gray-950">
											<span className="amount">
												{' '}
												{isYearly ? row.cells[0] : row.cells[1]}
											</span>
											ريال
											<span className="text-large font-medium text-gray-400">
												{' '}
												/{isYearly ? 'سنوياً' : 'شهرياً'}
											</span>
										</p>
										{/* <button
											className={cn(
												'h-12 w-full text-base',
												index == '1'
													? 'secondary'
													: 'tertiary border border-gray-200 text-gray-950',
											)}
										>
											إبدأ تجربتك المجانية
										</button> */}
									</div>
								)
							},
						)}
					</div>
					{/* table details */}
					<div className="relative mt-6 flex w-full flex-col gap-9 text-sm">
						{details?.slice(1).map((detail: any, index: any) => (
							<div key={'details_' + index} id={'details_' + index}>
								{/* table section header */}
								<h3
									className="text-main sticky top-[calc(var(--header-height)+170px)] z-[1] flex w-full flex-col justify-end rounded-2xl bg-teal-100 p-[var(--text-main--font-size)] font-semibold text-gray-900 max-lg:top-[var(--header-height)]"
									aria-hidden="true"
								>
									{detail.title}
								</h3>
								<div className="relative w-full max-lg:overflow-x-scroll">
									{/* table section details */}
									<div className="w-fit text-gray-600 lg:w-full">
										<div className="flex flex-row-reverse justify-end text-start text-sm font-medium text-gray-500 *:w-48 lg:hidden rtl:flex-row rtl:items-end">
											{details[0].specs.rows.map(
												(row: { cells: string[] }, index: string) => {
													return <div className="px-6 py-3">{row.cells[2]}</div>
												},
											)}
										</div>
										{detail.specs?.rows?.map((row: any, index: any) => (
											<div
												key={'rows_' + index}
												className="flex flex-row justify-between border-b border-gray-200 text-start *:w-full *:max-lg:w-48 rtl:flex-row-reverse"
											>
												{row.cells.map((cell: string, index: any) => {
													const cleanedCell = clean(cell)
													switch (cleanedCell) {
														case '-':
															return (
																<div
																	key={'cell_' + index}
																	id={'cell_' + index}
																	className={cn(
																		'flex items-center justify-start px-6 py-3',
																		index == 1 ? 'bg-teal-50' : '',
																	)}
																>
																	<PiXBold className="text-sm text-gray-400" />
																</div>
															)
														case '✓​​​​‌‍​‍​‍‌‍‌​‍‌‍‍‌‌‍‌‌‍‍‌‌‍‍​‍​‍​‍‍​‍​‍‌​‌‍​‌‌‍‍‌‍‍‌‌‌​‌‍‌​‍‍‌‍‍‌‌‍​‍​‍​‍​​‍​‍‌‍‍​‌​‍‌‍‌‌‌‍‌‍​‍​‍​‍‍​‍​‍‌‍‍​‌‌​‌‌​‌​​​‍‍​​​​​‌':
															return (
																<div
																	key={'cell_' + index}
																	className="flex justify-start px-6 py-2 text-sm text-teal-500"
																>
																	<PiCheckCircle />
																</div>
															)
														default:
															return (
																<div
																	key={'cell_' + index}
																	className={cn(
																		'flex items-center justify-start px-6 py-3',

																		index == 1 ? 'bg-teal-50' : '',
																		index == 3
																			? 'sticky end-0 w-48 bg-white font-medium'
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
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PlansComparison
