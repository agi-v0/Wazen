import { cn } from '@/lib/utils'
import CTAList from '@/components/ui/CTAList'
import { Icon } from '@iconify/react/dist/iconify.js'

// import NumberTicker from '../animated/number-ticker'

export default function PricingBox(props: {
	order: number
	displayPrice: boolean
	price: string
	apps: any
	duration: string
	packageName: string
	subtitle: string
	children: React.ReactNode
	ctas: Sanity.CTA[]
}) {
	const {
		displayPrice,
		price,
		apps,
		duration,
		packageName,
		subtitle,
		children,
		ctas,
		order,
	} = props
	// const AppIcons = [
	// 	<PiTableDuotone key="PiTableDuotone" className="text-2xl text-cyan-500" />,
	// 	<PiIdentificationCardDuotone
	// 		key="PiIdentificationCardDuotone"
	// 		className="text-2xl text-yellow-500"
	// 	/>,
	// 	<PiUserListDuotone
	// 		key="PiUserListDuotone"
	// 		className="text-2xl text-indigo-500"
	// 	/>,
	// 	<PiFlowArrowDuotone
	// 		key="PiFlowArrowDuotone"
	// 		className="text-2xl text-teal-500"
	// 	/>,
	// ]

	const numberPrice = Number(price)

	return (
		<div
			className={cn(
				'relative flex w-full flex-col justify-start gap-6 rounded-2xl border-2 border-gray-200 bg-white p-8',
				order == 1
					? 'border-none bg-teal-50 shadow-[0px_0px_0px_2px_rgba(45,212,191,1),_0px_1px_2px_-1px_rgba(28,_40,_64,_0.10),_0px_2px_4px_0px_rgba(28,_40,_64,_0.06)]'
					: '',
			)}
		>
			<div className="flex flex-col items-start justify-between">
				<h2 className="text-large font-semibold text-gray-950">
					{packageName}
				</h2>
				<p className="text-sm text-gray-600">{subtitle}</p>
			</div>
			<h3 className="inline-flex flex-row items-end gap-1 pt-4 text-3xl font-semibold text-gray-950">
				{/* <NumberTicker value={parseInt(price)} direction="up" /> */}
				<span className="amount">{price}</span>

				{!isNaN(numberPrice) && (
					<span
						className={cn(
							'text-lg text-gray-400',
							order == 1 ? 'text-gray-950' : '',
						)}
					>
						/{duration}
					</span>
				)}
			</h3>
			<ul className="flex flex-col gap-4">
				{apps.map(
					(
						app: { title: string; active: boolean; icon: { name: string } },
						index: any,
					) => (
						<li
							key={'feature' + index}
							className={`flex flex-row items-center gap-2 text-sm font-medium text-gray-600 ${!app.active ? 'opacity-40 grayscale' : ''}`}
						>
							<Icon
								icon={app.icon ? app.icon.name : 'ph:cube-duotone'}
								className="size-6 text-cyan-950/60"
							/>
							{app.title}
						</li>
					),
				)}
			</ul>
			<CTAList ctas={ctas} className="*:h-12 *:w-full *:text-base" />
			<div>{children}</div>
		</div>
	)
}
