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
		<div
			className="section w-full overflow-x-scroll py-24"
			style={
				{
					'--col-count': altAppsLogos.length,
					'--row-count': comparisonTable.rows.length + 1,
				} as React.CSSProperties
			}
		>
			{/* <div className="w-[1184]">
				<div
					className={`grid grid-cols-[repeat(var(--col-count),_minmax(0,_1fr))] items-center justify-center gap-2`}
				>
					{altAppsLogos?.map((logo: any, index: number) => (
						<span
							className={cn(
								'flex h-full w-full items-center justify-center pb-4 pt-8',
								index == 0 ? 'col-start-3 rounded-t-lg bg-teal-50 px-6' : '',
							)}
						>
							<Img
								image={logo}
								className="mx-auto h-auto w-[80%]"
								imageWidth={1000}
								key={'logo-' + index}
								alt="logo"
							/>
						</span>
					))}
				</div>
				<div className="container">
					<div className="relative flex w-full flex-col font-medium">
						{comparisonTable.rows?.map((featureRow: any, index: any) => {
							return (
								<div
									key={'row_' + index}
									id={'row_' + index}
									dir="ltr"
									className={cn(
										'-[&last:&:nth-child(5)]:bg-teal-50 -[&last:&:nth-child(5)]:pb-7 grid grid-cols-[repeat(var(--col-count),_minmax(0,_1fr))] content-center gap-2 text-start *:w-full *:p-3 rtl:flex-row-reverse',
									)}
								>
									{featureRow.cells.map((cell: string, index: number) =>
										cellContent(cell, index),
									)}
								</div>
							)
						})}
					</div>
				</div>
			</div> */}
			<div className="grid w-full grid-cols-[repeat(calc(var(--col-count)+2),_minmax(0,_1fr))]">
				<div className="col-span-2 mt-14 grid w-full grid-cols-1 grid-rows-[repeat(calc(var(--row-count)-1),_minmax(0,_1fr))]">
					{comparisonTable.rows.map((featureRow: any, index: any) => {
						return cellContent(featureRow.cells.slice(-1), index)
					})}
				</div>
				<div className="col-span-5 grid w-full grid-rows-[repeat(var(--row-count),_minmax(0,_1fr))] divide-y divide-slate-700">
					<div
						className={`grid grid-flow-col grid-cols-[repeat(var(--col-count),_minmax(0,_1fr))] items-center justify-center gap-2 pb-4`}
					>
						{altAppsLogos?.map((logo: any, index: number) => (
							<span
								className={cn('flex h-10 w-full items-center justify-center')}
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
								className="grid grid-cols-[repeat(var(--col-count),_minmax(0,_1fr))] gap-2"
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
	)
}

export default ComparisonTable

const cellContent = (cell: string, index?: number) => {
	switch (clean(cell)) {
		case 'x':
			return (
				<span
					className="flex items-center justify-center text-gray-600"
					key={index}
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
					key={index}
				>
					<PiCheckBold />
				</span>
			)

		default:
			return (
				<span
					className={cn('flex items-center justify-start text-gray-600')}
					key={index}
				>
					{clean(cell)}
				</span>
			)
	}
}
