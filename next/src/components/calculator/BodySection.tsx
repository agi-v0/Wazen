'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import React, { useState } from 'react'
import {
	PiFlowArrowDuotone,
	PiIdentificationCardDuotone,
	PiTableDuotone,
	PiUserListDuotone,
} from 'react-icons/pi'
import { changeQuantity } from '@/store/calculator'

const BodySection = ({ details }: any) => {
	const AppIcons = [
		<PiTableDuotone className="text-2xl text-cyan-500" />,
		<PiIdentificationCardDuotone className="text-2xl text-yellow-500" />,
		<PiUserListDuotone className="text-2xl text-indigo-500" />,
		<PiFlowArrowDuotone className="text-2xl text-teal-500" />,
	]

	const [quantity, setQuantity] = useState(1)

	const dispatch = useAppDispatch()

	const handleMinus = (id: any) => {
		dispatch(changeQuantity({ id: id, quantity: quantity - 1 }))
		setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
	}

	const handlePlus = (id: any) => {
		dispatch(changeQuantity({ id: id, quantity: quantity + 1 }))
		setQuantity(quantity + 1)
	}

	return (
		<div>
			{details?.map((detail: any, index: any) => (
				<div key={'details_' + index}>
					<div
						className="flex flex-row justify-start gap-2 rounded-md bg-teal-50 px-6 py-2 max-md:hidden md:order-1"
						aria-hidden="true"
					>
						{AppIcons[index]}
						{detail.title}
					</div>
					<div className="py-2 text-gray-600">
						{detail.specs?.rows?.map((row: any, index: any) => {
							if (typeof window !== 'undefined') {
								localStorage.setItem(
									'details',
									JSON.stringify(detail.specs.rows),
								)
							}
							return (
								<div
									key={'rows_' + index}
									className="mb-2 flex flex-row justify-between"
								>
									{row.cells.slice(0, 1).map((cell: any, index: any) => (
										<div
											key={'cell_' + index}
											className="flex w-full flex-wrap justify-start px-6 py-2"
										>
											{cell}
										</div>
									))}
									{row.cells.slice(1, 2).map((cell: any, index: any) => (
										<div
											key={'cell_' + index}
											className="flex w-full flex-wrap justify-start px-6 py-2"
										>
											{cell} ريال / مندوب / سنويا
										</div>
									))}
									<div className="w-full">
										<div className="flex h-full flex-row items-center justify-center gap-x-2">
											<button
												className="rounded-full px-2 hover:bg-gray-50"
												onClick={() => handlePlus(row._key)}
											>
												+
											</button>
											<div className="px-2">{quantity}</div>
											<button
												className="rounded-full px-2 hover:bg-gray-50"
												onClick={() => handleMinus(row._key)}
											>
												-
											</button>
										</div>
									</div>
									{row.cells.slice(1, 2).map((cell: any, index: any) => (
										<div
											key={'cell_' + index}
											className="flex w-full flex-wrap justify-start px-6 py-2"
										>
											{parseInt(cell) * quantity} ريال / مندوب / سنويا
										</div>
									))}
								</div>
							)
						})}
					</div>
				</div>
			))}
		</div>
	)
}

export default BodySection
