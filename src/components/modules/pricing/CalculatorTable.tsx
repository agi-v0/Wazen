'use client'

import { cn } from '@/lib/utils'
import React, { useCallback, useMemo, useEffect } from 'react'
import { Icon } from '@iconify-icon/react'

const AppIcons = [
	<Icon
		icon="ph:table-duotone"
		key="table"
		className="text-2xl text-cyan-500"
	/>,
	<Icon
		icon="ph:identification-card-duotone"
		key="id"
		className="text-2xl text-yellow-500"
	/>,
	<Icon
		icon="ph:user-list-duotone"
		key="user"
		className="text-2xl text-indigo-500"
	/>,
	<Icon
		icon="ph:flow-arrow-duotone"
		key="flow"
		className="text-2xl text-teal-500"
	/>,
]

interface RowData {
	cells: string[]
}

interface SpecsData {
	rows: RowData[]
}

interface DetailData {
	title: string
	specs: SpecsData
}

export default function CalculatorTable({
	details,
	setTotal,
	isYearly,
	locale,
}: {
	details: DetailData[]
	setTotal: (total: number) => void
	isYearly: boolean
	locale: 'en' | 'ar'
}) {
	const [quantities, setQuantities] = React.useState<Record<string, number>>({})
	const [activeCategories, setActiveCategories] = React.useState<number[]>([])

	const reducedDetails = useMemo(
		() => details.filter((detail) => detail.specs?.rows[0]?.cells[0]),
		[details],
	)

	const SR = locale === 'en' ? 'SR' : 'ريال'
	const monthly = locale === 'en' ? 'monthly' : 'شهرياً'
	const yearly = locale === 'en' ? 'Yearly' : 'سنوياً'

	const getItemId = useCallback(
		(categoryIndex: number, rowIndex: number) => `${categoryIndex}_${rowIndex}`,
		[],
	)

	const calculateRowTotal = useCallback(
		(price: number, quantity: number) => price * quantity,
		[],
	)

	const calculateCategoryTotal = useCallback(
		(categoryIndex: number, quantities: Record<string, number>) => {
			return details[categoryIndex].specs.rows.reduce((acc, row, rowIndex) => {
				const itemId = getItemId(categoryIndex, rowIndex)
				const quantity = quantities[itemId] || 0
				const price = Number(row.cells[isYearly ? 0 : 1])
				return acc + calculateRowTotal(price, quantity)
			}, 0)
		},
		[details, isYearly, getItemId, calculateRowTotal],
	)

	const calculateOverallTotal = useCallback(
		(quantities: Record<string, number>, activeCategories: number[]) => {
			return activeCategories.reduce((total, categoryIndex) => {
				return total + calculateCategoryTotal(categoryIndex, quantities)
			}, 0)
		},
		[calculateCategoryTotal],
	)

	const toggleCategory = useCallback((index: number) => {
		setActiveCategories((prev) => {
			const newActiveCategories = prev.includes(index)
				? prev.filter((item) => item !== index)
				: [...prev, index]

			return newActiveCategories
		})
	}, [])

	const handleQuantityChange = useCallback(
		(id: string, delta: number, value: number, categoryIndex: number) => {
			setActiveCategories((prev) => {
				if (delta > 0 && !prev.includes(categoryIndex)) {
					return [...prev, categoryIndex]
				}
				return prev
			})

			setQuantities((prev) => {
				const newQuantities = { ...prev }
				newQuantities[id] = Math.max(0, (prev[id] || 0) + delta)
				return newQuantities
			})
		},
		[],
	)

	useEffect(() => {
		const newTotal = calculateOverallTotal(quantities, activeCategories)
		setTotal(newTotal)
	}, [quantities, activeCategories, calculateOverallTotal, setTotal])

	return (
		<div className="relative mt-6 flex w-full flex-col gap-9">
			{reducedDetails.map((detail, categoryIndex) => (
				<div key={`details_${categoryIndex}`}>
					<h3
						className={cn(
							'text-main sticky top-[calc(var(--header-height)+72px)] z-1 flex cursor-pointer flex-row items-center justify-between rounded-2xl bg-teal-100 p-(--text-main--font-size) font-semibold hover:bg-teal-100 active:bg-teal-100 max-lg:top-[calc(var(--header-height)+95.51px)] md:order-1',
							!activeCategories.includes(categoryIndex) && 'grayscale',
						)}
						onClick={() => toggleCategory(categoryIndex)}
					>
						<div className="flex flex-row items-center gap-4">
							<div className="rounded-full bg-white p-2">
								{AppIcons[categoryIndex]}
							</div>
							<div className="flex flex-col items-start">
								{detail.title}
								<span className="text-sm font-normal text-gray-950/40">
									{locale === 'en'
										? 'Tap to add to estimated price'
										: 'انقر لإضافتها الى التكلفة التقديرية'}
								</span>
							</div>
						</div>
						{calculateCategoryTotal(categoryIndex, quantities)}
					</h3>

					<div className="text-gray-600">
						{detail.specs?.rows?.map((row: any, rowIndex: number) => {
							const id = getItemId(categoryIndex, rowIndex)
							const quantity = quantities[id] || 0
							const price = Number(row.cells[isYearly ? 0 : 1])

							return (
								row.cells[2] && (
									<div
										key={id}
										className="grid grid-cols-4 items-center justify-between border-b border-gray-200 py-3 text-sm max-sm:grid-cols-2"
									>
										<div className="flex w-full flex-wrap justify-start px-6 py-3 font-medium">
											{row.cells[2]}
										</div>
										<div className="flex w-full flex-wrap justify-start px-6 py-3 text-gray-500">
											{price} {SR} /{isYearly ? yearly : monthly}
										</div>
										<div className="flex h-full w-full flex-row items-center justify-center gap-1 px-6 *:transition-all max-lg:justify-start ltr:flex-row-reverse">
											<button
												className="group rounded-full p-2 transition-colors duration-300 hover:bg-gray-100 active:bg-gray-200"
												onClick={() =>
													handleQuantityChange(id, 1, price, categoryIndex)
												}
											>
												<Icon
													icon="ph:plus-bold"
													className="size-4 text-gray-400 group-hover:text-gray-500"
												/>
											</button>
											<span className="max-w-8 grow px-2 text-center">
												{quantity}
											</span>
											<button
												className="group rounded-full p-2 transition-colors duration-300 hover:bg-gray-100 active:bg-gray-200"
												onClick={() =>
													handleQuantityChange(id, -1, price, categoryIndex)
												}
											>
												<Icon
													icon="ph:minus-bold"
													className="size-4 text-gray-400 group-hover:text-gray-500"
												/>
											</button>
										</div>
										<div className="flex h-full w-full flex-row items-center justify-end gap-x-2 px-6 py-3 font-medium text-gray-500 max-lg:justify-start">
											{calculateRowTotal(price, quantity)} {SR} /
											{isYearly ? yearly : monthly}
										</div>
									</div>
								)
							)
						})}
					</div>
				</div>
			))}
		</div>
	)
}
