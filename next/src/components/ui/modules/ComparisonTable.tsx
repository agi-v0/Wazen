import { cn } from '@/lib/utils'
import Img from '../Img'
import { PiCheckBold, PiXBold } from '@/components/ui/Icons'
import { getLocale } from 'next-intl/server'

export default async function ComparisonTable({
	altApps,
	altAppsLogos,
	comparisonTable,
}: Partial<{
	altApps: any
	altAppsLogos: any
	comparisonTable: any
}>) {
	const locale = await getLocale()
	return (
		locale &&
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
								return cellContent(featureRow.cells.slice(-1), index, locale)
							})}
						</div>
						<div className="col-span-5 grid w-[480px] grid-rows-[repeat(var(--row-count),_minmax(0,_1fr))] divide-y divide-gray-200 lg:w-full">
							<div
								className={`grid grid-flow-col grid-cols-[repeat(var(--col-count),_minmax(0,_1fr))] items-center justify-center gap-2 pb-4`}
							>
								{altAppsLogos?.map((logo: any, index: number) => (
									<span
										key={'logo-' + index}
										className={cn(
											'flex h-10 w-24 items-center justify-center lg:w-full',
										)}
									>
										<Img
											image={logo}
											className="mx-auto h-auto w-[75%]"
											imageWidth={1000}
											alt="logo"
										/>
									</span>
								))}
							</div>
							{comparisonTable.rows.map((featureRow: any, index: any) => {
								return (
									<div
										dir={locale === 'ar' ? 'ltr' : 'rtl'}
										key={index}
										className="grid grid-flow-col grid-cols-[repeat(var(--col-count),_minmax(0,_1fr))] gap-2 *:w-24 *:lg:w-full"
									>
										{featureRow.cells
											.slice(0, featureRow.cells.length - 1)
											.map((cell: string, index: number) =>
												cellContent(cell, index, locale),
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

const cellContent = (cell: string, index: number, locale: string) => {
	switch (cell) {
		case 'x':
			return (
				<span
					className="flex items-center justify-center text-gray-600"
					key={Math.random() * (index + Math.random())}
				>
					<PiXBold className="size-4" />
				</span>
			)

		case '✓':
			return (
				<span
					className={cn(
						'flex items-center justify-center text-teal-500',
						index === 4 ? 'bg-teal-50' : '',
					)}
					key={Math.random() * (index + Math.random())}
				>
					<PiCheckBold className="size-4" />
				</span>
			)

		default:
			return (
				<span
					className={cn('flex items-center justify-start text-gray-600')}
					key={Math.random() * (index + Math.random())}
				>
					{cell}
				</span>
			)
	}
}
