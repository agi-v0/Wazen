'use client'

import React, { useState } from 'react'
import Img from '../Img'

const ComparisonTable = ({
	altApps,
}: Partial<{
	altApps: any
}>) => {
	return (
		<div className="section py-24">
			<div className="flex justify-between gap-4">
				{altApps.altAppsLogos?.map((logo: any) => (
					<Img image={logo} className="w-[150px]" imageWidth={300} />
				))}
			</div>
			<div className="container">
				<div
					className="relative mt-6 flex h-full w-full flex-col gap-9 text-sm"
				>
					{altApps.comparisonTable.rows?.map((featureRow: any, index: any) => {
						console.log(featureRow.cells)
						return (
							<div
								key={'row_' + index}
								id={'row_' + index}
								className="flex flex-row justify-between border-b border-gray-200 text-start *:w-full *:max-lg:w-48 rtl:flex-row-reverse"
							>
								{featureRow.cells.map((cell: any) => (
									<div>{cell}</div>
								))}
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default ComparisonTable
