'use client'

import React, { useEffect, useState } from 'react'
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
}: {
	details: any
	total: any
	setTotal: any
}) => {
	const AppIcons = [
		<PiTableDuotone className="text-2xl text-cyan-500" />,
		<PiIdentificationCardDuotone className="text-2xl text-yellow-500" />,
		<PiUserListDuotone className="text-2xl text-indigo-500" />,
		<PiFlowArrowDuotone className="text-2xl text-teal-500" />,
	]

	const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

	const handleMinus = (id: any, value: any) => {
		setQuantities((prevQuantities: { [id: string]: number }) => ({
			...prevQuantities,
			[id]: Math.max(0, (prevQuantities[id] || 0) - 1),
		}))

		if (quantities[id] !== 0) {
			setTotal(total - value)
		}
	}

	const handlePlus = (id: any, value: any) => {
		setQuantities((prevQuantities: { [id: string]: number }) => ({
			...prevQuantities,
			[id]: (prevQuantities[id] || 0) + 1,
		}))

		setTotal(total + value)
	}

	return (
		<>
			{details?.map((detail: { title: string; specs: any }, index: any) => {
				return (
					<div key={'details_' + index}>
						<div
							className="text-main top-[calc(var(--header-height)+192px)] z-[1] flex flex-row justify-start gap-4 rounded-2xl bg-teal-100 p-[var(--text-main--font-size)] font-semibold max-md:hidden md:order-1"
							aria-hidden="true"
						>
							{AppIcons[index]}
							{detail.title}
						</div>
						<div className="py-2 text-gray-600">
							{detail.specs?.rows?.map(
								(row: { cells: string[] }, _key: string) => {
									const rowKey = `${_key}`
									const quantity = quantities[rowKey] || 0

									return (
										<div
											key={_key}
											id={_key}
											className="mb-2 flex flex-row items-center justify-between border-b border-gray-200"
										>
											<div
												key={'cell-title' + _key}
												className="flex w-full flex-wrap justify-start px-6 py-2"
											>
												{row.cells[2]}
											</div>
											<div
												key={'cell-value' + _key}
												className="flex w-full flex-wrap justify-start px-6 py-2"
											>
												{row.cells[1]} ريال / مندوب / سنويا
											</div>
											<div className="flex h-full w-full flex-row items-center justify-center gap-x-2">
												<button
													className="rounded-full px-2 hover:bg-gray-50"
													onClick={() =>
														handlePlus(_key, parseInt(row.cells[1]))
													}
												>
													+
												</button>
												<div className="px-2">{quantity}</div>
												<button
													className="rounded-full px-2 hover:bg-gray-50"
													onClick={() =>
														handleMinus(_key, parseInt(row.cells[1]))
													}
												>
													-
												</button>
											</div>
											<div className="flex h-full w-full flex-row items-center justify-end gap-x-2">
												<div className="px-2">
													{quantity * parseInt(row.cells[1])} ريال / مندوب /
													سنويا
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
