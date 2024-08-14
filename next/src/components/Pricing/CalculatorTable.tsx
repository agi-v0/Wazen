'use client'

import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import {
	PiFlowArrowDuotone,
	PiIdentificationCardDuotone,
	PiTableDuotone,
	PiUserListDuotone,
} from 'react-icons/pi'

const CalculatorTable = ({
	details,
	total,
	setTotal,
	isMonthly,
}: {
	details: any
	total: any
	setTotal: any
	isMonthly: any
}) => {
	const AppIcons = [
		<PiTableDuotone className="text-2xl text-cyan-500" />,
		<PiIdentificationCardDuotone className="text-2xl text-yellow-500" />,
		<PiUserListDuotone className="text-2xl text-indigo-500" />,
		<PiFlowArrowDuotone className="text-2xl text-teal-500" />,
	]

	const [quantities, setQuantities] = useState<{ [key: string]: any }>({})

	const [activateArray, setActivateArray] = useState<string[]>([])

	const handleMinus = (id: any, value: any) => {
		setQuantities((prevQuantities: { [id: string]: number }) => ({
			...prevQuantities,
			[id]: Math.max(0, (prevQuantities[id] || 0) - 1),
		}))

		if (quantities[id] > 0) {
			setTotal(total - value)
		}
	}

	const handlePlus = (id: any, value: any, index: any) => {
		setQuantities((prevQuantities: { [id: string]: number }) => ({
			...prevQuantities,
			[id]: (prevQuantities[id] || 0) + 1,
		}))

		if (quantities[id] == 0 || quantities[id] == undefined) {
			setActivateArray([...activateArray, index])
		}

		setTotal(total + value)
	}

	const activateCategory = (index: any) => {
		if (activateArray.includes(index)) {
			setActivateArray(
				activateArray.filter((item) => {
					return item !== index
				}),
			)
		} else {
			setActivateArray([...activateArray, index])
		}
	}

	return (
		<>
			{details?.map((detail: { title: string; specs: any }, index: any) => {
				return (
					<div key={'details_' + index}>
						<h3
							className={cn(
								'text-main sticky top-[calc(var(--header-height)+98px)] z-[1] flex cursor-pointer flex-row justify-start gap-4 rounded-2xl bg-teal-100 p-[var(--text-main--font-size)] font-semibold hover:bg-teal-50 active:bg-teal-100 max-md:hidden md:order-1',
								activateArray.includes(index) ? '' : 'grayscale',
							)}
							aria-hidden="true"
							onClick={() => activateCategory(index)}
						>
							{AppIcons[index]}
							{detail.title}
						</h3>

						<div className="py-2 text-gray-600">
							{detail.specs?.rows?.map(
								(row: { cells: string[]; _key: string }) => {
									const rowKey = `${row._key}`
									const quantity = quantities[rowKey] || 0

									return (
										<div
											key={row._key}
											id={row._key}
											className="mb-2 flex flex-row items-center justify-between border-b border-gray-200"
										>
											<div
												key={'cell-title' + row._key}
												className="flex w-full flex-wrap justify-start px-6 py-2"
											>
												{row.cells[2]}
											</div>
											<div
												key={'cell-value' + row._key}
												className="flex w-full flex-wrap justify-start px-6 py-2"
											>
												{row.cells[!isMonthly ? 1 : 0]} ريال / مندوب /{' '}
												{!isMonthly ? 'شهرياً' : 'سنوياً'}
											</div>
											<div className="flex h-full w-full flex-row items-center justify-center gap-x-2">
												<button
													className="rounded-full px-2 hover:bg-gray-50"
													onClick={() =>
														handlePlus(
															row._key,
															parseInt(row.cells[!isMonthly ? 1 : 0]),
															index,
														)
													}
												>
													+
												</button>
												<div className="px-2">{quantity}</div>
												<button
													className="rounded-full px-2 hover:bg-gray-50"
													onClick={() =>
														handleMinus(
															row._key,
															parseInt(row.cells[!isMonthly ? 1 : 0]),
														)
													}
												>
													-
												</button>
											</div>
											<div className="flex h-full w-full flex-row items-center justify-end gap-x-2">
												<div className="px-2">
													{quantity * parseInt(row.cells[!isMonthly ? 1 : 0])}{' '}
													ريال / مندوب /{!isMonthly ? 'شهرياً' : 'سنوياً'}
												</div>
											</div>
										</div>
									)
								},
							)}
						</div>
					</div>
				)
			})}
		</>
	)
}

export default CalculatorTable
