'use client'

import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import {
	PiFlowArrowDuotone,
	PiIdentificationCardDuotone,
	PiMinusBold,
	PiPlusBold,
	PiTableDuotone,
	PiUserListDuotone,
} from '@/ui/Icons'

const CalculatorTable = ({
	details,
	setTotal,
	isYearly,
	locale,
}: {
	details: any
	setTotal: any
	isYearly: any
	locale: string
}) => {
	const t = useTranslations('Pricing')

	// const t = useTranslations('Pricing')
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

	const CategoryTotals = (
		obj: { [key: string]: number[] },
		activateArray: number[],
	): { [key: string]: number } => {
		const result: { [key: string]: number } = {}

		if (Object.entries(obj).length > 0) {
			activateArray.forEach((key) => {
				if (obj[key] && Array.isArray(obj[key])) {
					const sum = obj[key].reduce((acc, num) => acc + num, 0)
					result[key] = sum
				} else {
					result[key] = 0
				}
			})
		}

		const totalSum = Object.values(result).reduce((acc, num) => acc + num, 0)

		setTotal(totalSum)

		setCategoryTotal(result)

		return result
	}

	const activateCategory = (index: any) => {
		setCategoryTotalObj((prev) => ({
			...prev,
			[index]: [...(prev[index] || []), 0],
		}))

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
		CategoryTotals(categoryTotalObj, activateArray)
	}, [quantities, activateArray])

	return (
		<div className="relative mt-6 flex w-full flex-col gap-9">
			{details?.map((detail: { title: string; specs: any }, index: any) => {
				return (
					<div key={'details_' + index}>
						<h3
							className={cn(
								'text-main sticky top-[calc(var(--header-height)+72px)] z-[1] flex cursor-pointer flex-row items-center justify-between rounded-2xl bg-teal-100 p-[var(--text-main--font-size)] font-semibold hover:bg-teal-100 active:bg-teal-100 max-lg:top-[calc(var(--header-height)+95.51px)] md:order-1',
								activateArray.includes(index) ? '' : 'grayscale',
							)}
							aria-hidden="true"
							onClick={() => {
								activateCategory(index)
							}}
						>
							<div className="flex flex-row items-center gap-4">
								<div className="rounded-full bg-white p-2">
									{AppIcons[index]}
								</div>
								<div className="flex flex-col items-start">
									{detail.title}
									<span className="text-sm font-normal text-gray-950/40">
										{locale == 'en'
											? 'Tap to add to estimated price'
											: 'انقر لإضافتها الى التكلفة التقديرية'}
									</span>
								</div>
							</div>
							{categoryTotal[index]}
						</h3>

						<div className="text-gray-600">
							{detail.specs?.rows?.map(
								(row: { cells: string[]; _key: string }) => {
									const rowKey = `${row._key}`
									const quantity = quantities[rowKey] || 0

									return (
										row.cells[2] && (
											<div
												key={row._key}
												id={row._key}
												className="grid grid-cols-4 items-center justify-between border-b border-gray-200 py-3 text-sm max-lg:grid-cols-2"
											>
												<div
													id="row-title"
													key={'row-title' + row._key}
													className="flex w-full flex-wrap justify-start px-6 py-3 font-medium"
												>
													{row.cells[2]}
												</div>
												<div
													key={'cell-value' + row._key}
													className="flex w-full flex-wrap justify-start px-6 py-3 text-gray-500"
												>
													{row.cells[!isYearly ? 1 : 0]} {t('SR')} /
													{!isYearly ? t('Monthly') : t('Yearly')}
												</div>
												<div className="flex h-full w-full flex-row items-center justify-center gap-1 px-6 *:transition-all max-lg:justify-start">
													<button
														className="group rounded-full p-2 hover:bg-gray-50"
														onClick={() => {
															handlePlus(
																row._key,
																parseInt(row.cells[!isYearly ? 1 : 0]),
																index,
															)
														}}
													>
														<PiPlusBold className="text-sm text-gray-400 group-hover:text-gray-500" />
													</button>
													<div className="px-2">{quantity}</div>
													<button
														className="group rounded-full p-2 hover:bg-gray-50"
														onClick={() => {
															handleMinus(
																row._key,
																parseInt(row.cells[!isYearly ? 1 : 0]),
																index,
															)
														}}
													>
														<PiMinusBold className="text-sm text-gray-400 group-hover:text-gray-500" />
													</button>
												</div>
												<div className="flex h-full w-full flex-row items-center justify-end gap-x-2 px-6 py-3 font-medium text-gray-500 max-lg:justify-start">
													{quantity * parseInt(row.cells[isYearly ? 0 : 1])}
													{t('SR')} /{isYearly ? t('Yearly') : t('Monthly')}
												</div>
											</div>
										)
									)
								},
							)}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default CalculatorTable
