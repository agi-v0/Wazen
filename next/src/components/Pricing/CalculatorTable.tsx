'use client'

import React, { useState } from 'react'
import {
	PiFlowArrowDuotone,
	PiIdentificationCardDuotone,
	PiTableDuotone,
	PiUserListDuotone,
} from 'react-icons/pi'

const CalculatorTable = ({ details }: any) => {
	const AppIcons = [
		<PiTableDuotone className="text-2xl text-cyan-500" />,
		<PiIdentificationCardDuotone className="text-2xl text-yellow-500" />,
		<PiUserListDuotone className="text-2xl text-indigo-500" />,
		<PiFlowArrowDuotone className="text-2xl text-teal-500" />,
	]

	const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

	// const dispatch = useAppDispatch()

	const handleMinus = (id: any) => {
		setQuantities((prevQuantities: { [id: string]: number }) => ({
			...prevQuantities,
			[id]: Math.max(0, (prevQuantities[id] || 0) - 1),
		}))
	}

	const handlePlus = (id: any) => {
		setQuantities((prevQuantities: { [id: string]: number }) => ({
			...prevQuantities,
			[id]: (prevQuantities[id] || 0) + 1,
		}))
	}

	return (
		<>
			{details?.map((detail: { title: string; specs: any }, index: any) => {
				return (
					<div key={'details_' + index}>
						<div
							className="flex flex-row justify-start gap-2 rounded-md bg-teal-50 px-6 py-3 max-md:hidden md:order-1"
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
											className="mb-2 flex flex-row items-center justify-between"
										>
											<div
												key={'cell-title' + _key}
												className="flex w-full flex-wrap justify-start px-6 py-2"
											>
												{row.cells[0]}
											</div>
											<div
												key={'cell-value' + _key}
												className="flex w-full flex-wrap justify-start px-6 py-2"
											>
												{row.cells[1]} ريال / مندوب / سنويا
											</div>
											<div className="flex h-full flex-row items-center justify-center gap-x-2">
												<button
													className="rounded-full px-2 hover:bg-gray-50"
													onClick={() => handlePlus(_key)}
												>
													+
												</button>
												<div className="px-2">{quantity}</div>
												<button
													className="rounded-full px-2 hover:bg-gray-50"
													onClick={() => handleMinus(_key)}
												>
													-
												</button>
											</div>
											<div className="flex h-full flex-row items-center justify-center gap-x-2">
												<div className="px-2">
													{quantity * parseInt(row.cells[1])}
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
