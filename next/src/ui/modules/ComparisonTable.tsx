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
			className="section w-full py-24"
			style={
				{
					'--col-count': altAppsLogos.length + 1,
				} as React.CSSProperties
			}
		>
			<div
				className={`grid grid-cols-[repeat(var(--col-count),_minmax(0,_1fr))] items-center gap-6 *:px-6`}
			>
				{altAppsLogos?.map((logo: any, index: number) => (
					<Img
						image={logo}
						className={cn('h-auto w-full', index == 0 ? 'col-start-2' : '')}
						imageWidth={300}
						key={'logo-' + index}
					/>
				))}
			</div>
			<div className="container">
				<div className="relative flex w-full flex-col text-sm font-medium">
					{comparisonTable.rows?.map((featureRow: any, index: any) => {
						return (
							<div
								key={'row_' + index}
								id={'row_' + index}
								className="flex flex-row items-center gap-6 border-b border-gray-200 py-3 text-start *:w-full *:px-3 *:max-lg:w-48 rtl:flex-row-reverse"
							>
								{featureRow.cells.map((cell: string, index: number) =>
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

const cellContent = (cell: string, index: number) => {
	switch (clean(cell)) {
		case 'x':
			return (
				<span
					className="flex items-center justify-center text-xl text-red-400"
					key={index}
				>
					<PiXBold />
				</span>
			)

		case '✓':
			return (
				<span
					className={cn(
						'flex items-center justify-center text-xl',
						index === 4 ? 'text-teal-500' : 'text-gray-400',
					)}
					key={index}
				>
					<PiCheckBold />
				</span>
			)

		default:
			return (
				<span
					className="flex items-center justify-start text-gray-600"
					key={index}
				>
					{clean(cell)}
				</span>
			)
	}
}
