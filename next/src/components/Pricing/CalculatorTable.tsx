'use client'

import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import {
	PiFlowArrowDuotone,
	PiIdentificationCardDuotone,
	PiTableDuotone,
	PiUserListDuotone,
} from 'react-icons/pi'

const CalculatorTable = ({
	details,
	setTotal,
	isYearly,
}: {
	details: any
	setTotal: any
	isYearly: any
}) => {
	const AppIcons = [
		<PiTableDuotone className="text-2xl text-cyan-500" />,
		<PiIdentificationCardDuotone className="text-2xl text-yellow-500" />,
		<PiUserListDuotone className="text-2xl text-indigo-500" />,
		<PiFlowArrowDuotone className="text-2xl text-teal-500" />,
	]

	const [quantities, setQuantities] = useState<{ [key: string]: any }>({})

	const [categoryTotalObj, setCategoryTotalObj] = useState<{
		[key: string]: any[]
	}>({})

	const [categoryTotal, setCategoryTotal] = useState<{ [key: string]: number }>(
		{},
	)

	const [activateArray, setActivateArray] = useState<number[]>([])

	const handleMinus = (id: any, value: any, index: any) => {
		setQuantities((prevQuantities: { [id: string]: number }) => ({
			...prevQuantities,
			[id]: Math.max(0, (prevQuantities[id] || 0) - 1),
		}))

		setCategoryTotalObj((prev) => {
			const updatedArray = [...prev[index]]
			const valueIndex = updatedArray.findIndex((item) => item === value)

			if (valueIndex !== -1) {
				updatedArray.splice(valueIndex, 1)
			}

			return {
				...prev,
				[index]: updatedArray,
			}
		})
	}

	const handlePlus = (id: any, value: any, index: any) => {
		setQuantities((prevQuantities: { [id: string]: number }) => ({
			...prevQuantities,
			[id]: (prevQuantities[id] || 0) + 1,
		}))

		if (quantities[id] == 0 || quantities[id] == undefined) {
			setActivateArray([...activateArray, index])
		}

		setCategoryTotalObj((prev) => ({
			...prev,
			[index]: [...(prev[index] || []), value],
		}))
	}

	const CategoryTotals = (obj: {
		[key: string]: number[]
	}): { [key: string]: number } => {
		const result: { [key: string]: number } = {}
		let totalSum = 0
		
		if (Object.entries(obj).length > 0) {
			activateArray.forEach((key: any, index: any) => {
				const sum = obj[key]?.reduce((acc, num) => acc + num, 0)
				result[key] = sum
				totalSum += sum
			})
		}
		setTotal(totalSum)

		setCategoryTotal(result)

		return result
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

	useEffect(() => {
		CategoryTotals(categoryTotalObj)
	}, [quantities, activateArray])

	return (
		<>
			{details?.map((detail: { title: string; specs: any }, index: any) => {
				return (
					<div key={'details_' + index}>
						<h3
							className={cn(
								'text-main sticky top-[calc(var(--header-height)+96px)] z-[1] flex cursor-pointer flex-row justify-between rounded-2xl bg-teal-100 p-[var(--text-main--font-size)] font-semibold hover:bg-teal-50 active:bg-teal-100 max-md:hidden md:order-1',
								activateArray.includes(index) ? '' : 'grayscale',
							)}
							aria-hidden="true"
							onClick={() => {
								activateCategory(index)
							}}
						>
							<div className="flex flex-row gap-4">
								{AppIcons[index]}
								{detail.title}
							</div>
							{categoryTotal[index]}
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
												{row.cells[!isYearly ? 1 : 0]} ريال / مندوب /{' '}
												{!isYearly ? 'شهرياً' : 'سنوياً'}
											</div>
											<div className="flex h-full w-full flex-row items-center justify-center gap-x-2">
												<button
													className="rounded-full px-2 hover:bg-gray-50"
													onClick={() => {
														handlePlus(
															row._key,
															parseInt(row.cells[!isYearly ? 1 : 0]),
															index,
														)
													}}
												>
													+
												</button>
												<div className="px-2">{quantity}</div>
												<button
													className="rounded-full px-2 hover:bg-gray-50"
													onClick={() => {
														handleMinus(
															row._key,
															parseInt(row.cells[!isYearly ? 1 : 0]),
															index,
														)
													}}
												>
													-
												</button>
											</div>
											<div className="flex h-full w-full flex-row items-center justify-end gap-x-2">
												<div className="px-2">
													{quantity * parseInt(row.cells[!isYearly ? 1 : 0])}{' '}
													ريال / مندوب /{!isYearly ? 'شهرياً' : 'سنوياً'}
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
