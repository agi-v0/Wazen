import { clean, cn } from '@/lib/utils'
import Img from '../Img'
import { PiCheck, PiCheckBold, PiX, PiXBold } from 'react-icons/pi'

const ComparisonTable = ({
	altApps,
	altAppsLogos,
	comparisonTable,
}: Partial<{
	altApps: any
	altAppsLogos: any
	comparisonTable: any
}>) => {
	return (
		comparisonTable.rows[0] &&
		altAppsLogos && (
			<div
				className="section relative w-full py-6"
				style={
					{
						'--col-count': altAppsLogos.length,
						'--row-count': comparisonTable.rows.length + 1,
					} as React.CSSProperties
				}
			>
				<div className="absolute start-0 top-0 z-50 h-full w-4 translate-x-0 bg-white"></div>
				<div className="w-full max-lg:overflow-x-scroll">
					<div className="grid w-[672px] grid-cols-[repeat(calc(var(--col-count)+2),_minmax(0,_1fr))] lg:w-full">
						<div className="sticky start-0 col-span-2 mt-14 grid grid-flow-row grid-cols-1 grid-rows-[repeat(calc(var(--row-count)-1),_minmax(0,_1fr))] rounded-lg border-gray-200 bg-white *:border-t max-lg:w-48">
							{comparisonTable.rows.map((featureRow: any, index: any) => {
								return cellContent(featureRow.cells.slice(-1), index)
							})}
						</div>
						<div className="col-span-5 grid w-[480px] grid-rows-[repeat(var(--row-count),_minmax(0,_1fr))] divide-y divide-gray-200 lg:w-full">
							<div
								className={`grid grid-flow-col grid-cols-[repeat(var(--col-count),_minmax(0,_1fr))] items-center justify-center gap-2 pb-4`}
							>
								{altAppsLogos?.map((logo: any, index: number) => (
									<span
										className={cn(
											'flex h-10 w-24 items-center justify-center lg:w-full',
										)}
									>
										<Img
											image={logo}
											className="mx-auto h-auto w-[75%]"
											imageWidth={1000}
											key={'logo-' + index}
											alt="logo"
										/>
									</span>
								))}
							</div>
							{comparisonTable.rows.map((featureRow: any, index: any) => {
								return (
									<div
										dir="ltr"
										key={index}
										className="grid grid-flow-col grid-cols-[repeat(var(--col-count),_minmax(0,_1fr))] gap-2 *:w-24 *:lg:w-full"
									>
										{featureRow.cells
											.slice(0, featureRow.cells.length - 1)
											.map((cell: string, index: number) =>
												cellContent(cell, index),
											)}
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default ComparisonTable

const cellContent = (cell: string, index: number) => {
	switch (clean(cell)) {
		case 'x':
			return (
				<span
					className="flex items-center justify-center text-gray-600"
					key={Math.random() * (index + Math.random())}
				>
					<PiXBold />
				</span>
			)

		case '✓':
			return (
				<span
					className={cn(
						'flex items-center justify-center',
						index === 4 ? 'bg-teal-50 text-teal-500' : 'text-teal-500',
					)}
					key={Math.random() * (index + Math.random())}
				>
					<PiCheckBold />
				</span>
			)

		default:
			return (
				<span
					className={cn('flex items-center justify-start text-gray-600')}
					key={Math.random() * (index + Math.random())}
				>
					{clean(cell)}
				</span>
			)
	}
}
