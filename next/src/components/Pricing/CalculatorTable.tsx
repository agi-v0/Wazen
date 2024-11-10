'use client'

import { cn } from '@/lib/utils'
import React, { useCallback, useMemo } from 'react'
import {
	PiFlowArrowDuotone,
	PiIdentificationCardDuotone,
	PiMinusBold,
	PiPlusBold,
	PiTableDuotone,
	PiUserListDuotone,
} from '@/ui/Icons'

const AppIcons = [
	<PiTableDuotone key="table" className="text-2xl text-cyan-500" />,
	<PiIdentificationCardDuotone key="id" className="text-2xl text-yellow-500" />,
	<PiUserListDuotone key="user" className="text-2xl text-indigo-500" />,
	<PiFlowArrowDuotone key="flow" className="text-2xl text-teal-500" />,
]

export default function CalculatorTable({
	details,
	setTotal,
	isYearly,
	locale,
}: {
	details: any[]
	setTotal: (total: number) => void
	isYearly: boolean
	locale: string
}) {
	const [quantities, setQuantities] = React.useState<Record<string, number>>({})
	const [activeCategories, setActiveCategories] = React.useState<number[]>([])

	const SR = locale === 'en' ? 'SR' : 'ريال'
	const monthly = locale === 'en' ? 'monthly' : 'شهرياً'
	const yearly = locale === 'en' ? 'Yearly' : 'سنوياً'

	const handleQuantityChange = useCallback(
		(id: string, delta: number, value: number, categoryIndex: number) => {
			setQuantities((prev) => {
				const newQuantity = Math.max(0, (prev[id] || 0) + delta)
				const newQuantities = { ...prev, [id]: newQuantity }

				// Calculate new total
				const newTotal = Object.entries(newQuantities).reduce(
					(acc, [key, quantity]) => {
						const [categoryIndex, rowIndex] = key.split('_').map(Number)
						const price = parseInt(
							details[categoryIndex].specs.rows[rowIndex].cells[
								isYearly ? 0 : 1
							],
						)
						return acc + quantity * price
					},
					0,
				)

				setTotal(newTotal)

				// Update active categories
				if (newQuantity > 0 && !activeCategories.includes(categoryIndex)) {
					setActiveCategories((prev) => [...prev, categoryIndex])
				} else if (newQuantity === 0) {
					const categoryIsEmpty = Object.keys(newQuantities).every((key) =>
						key.startsWith(`${categoryIndex}_`)
							? newQuantities[key] === 0
							: true,
					)
					if (categoryIsEmpty) {
						setActiveCategories((prev) =>
							prev.filter((cat) => cat !== categoryIndex),
						)
					}
				}

				return newQuantities
			})
		},
		[details, isYearly, activeCategories, setTotal],
	)

	const toggleCategory = useCallback((index: number) => {
		setActiveCategories((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
		)
	}, [])

	const categoryTotals = useMemo(() => {
		return details.map((detail, categoryIndex) =>
			detail.specs?.rows?.reduce((acc: number, row: any, rowIndex: number) => {
				const quantity = quantities[`${categoryIndex}_${rowIndex}`] || 0
				const price = parseInt(row.cells[isYearly ? 0 : 1])
				return acc + quantity * price
			}, 0),
		)
	}, [details, quantities, isYearly])

	return (
		<div className="relative mt-6 flex w-full flex-col gap-9">
			{details.map((detail, categoryIndex) => (
				<div key={`details_${categoryIndex}`}>
					<h3
						className={cn(
							'text-main sticky top-[calc(var(--header-height)+72px)] z-[1] flex cursor-pointer flex-row items-center justify-between rounded-2xl bg-teal-100 p-[var(--text-main--font-size)] font-semibold hover:bg-teal-100 active:bg-teal-100 max-lg:top-[calc(var(--header-height)+95.51px)] md:order-1',
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
						{categoryTotals[categoryIndex]}
					</h3>

					<div className="text-gray-600">
						{detail.specs?.rows?.map((row: any, rowIndex: number) => {
							const id = `${categoryIndex}_${rowIndex}`
							const quantity = quantities[id] || 0
							const price = parseInt(row.cells[isYearly ? 0 : 1])

							return (
								row.cells[2] && (
									<div
										key={id}
										className="grid grid-cols-4 items-center justify-between border-b border-gray-200 py-3 text-sm max-lg:grid-cols-2"
									>
										<div className="flex w-full flex-wrap justify-start px-6 py-3 font-medium">
											{row.cells[2]}
										</div>
										<div className="flex w-full flex-wrap justify-start px-6 py-3 text-gray-500">
											{price} {SR} /{isYearly ? yearly : monthly}
										</div>
										<div className="flex h-full w-full flex-row items-center justify-center gap-1 px-6 *:transition-all max-lg:justify-start ltr:flex-row-reverse">
											<button
												className="group rounded-full p-2 hover:bg-gray-50"
												onClick={() =>
													handleQuantityChange(id, 1, price, categoryIndex)
												}
											>
												<PiPlusBold className="size-4 text-gray-400 group-hover:text-gray-500" />
											</button>
											<div className="px-2">{quantity}</div>
											<button
												className="group rounded-full p-2 hover:bg-gray-50"
												onClick={() =>
													handleQuantityChange(id, -1, price, categoryIndex)
												}
											>
												<PiMinusBold className="size-4 text-gray-400 group-hover:text-gray-500" />
											</button>
										</div>
										<div className="flex h-full w-full flex-row items-center justify-end gap-x-2 px-6 py-3 font-medium text-gray-500 max-lg:justify-start">
											{quantity * price} {SR} /{isYearly ? yearly : monthly}
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
