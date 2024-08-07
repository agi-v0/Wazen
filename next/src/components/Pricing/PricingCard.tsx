import { cn } from '@/lib/utils'
import CTAList from '@/ui/CTAList'
import {
	PiFlowArrowDuotone,
	PiIdentificationCardDuotone,
	PiTableDuotone,
	PiUserListDuotone,
	PiCheckBold,
	PiXBold,
} from 'react-icons/pi'
import NumberTicker from '../animated/number-ticker'

const PricingBox = (props: {
	order: string
	price: string
	apps: any
	duration: string
	packageName: string
	subtitle: string
	children: React.ReactNode
	ctas: Sanity.CTA[]
}) => {
	const {
		price,
		apps,
		duration,
		packageName,
		subtitle,
		children,
		ctas,
		order,
	} = props

	const AppIcons = [
		<PiTableDuotone className="text-2xl text-cyan-500" />,
		<PiIdentificationCardDuotone className="text-2xl text-yellow-500" />,
		<PiUserListDuotone className="text-2xl text-indigo-500" />,
		<PiFlowArrowDuotone className="text-2xl text-teal-500" />,
	]

	return (
		<div
			className={cn(
				'relative flex w-full flex-col justify-start gap-6 rounded-2xl bg-teal-50 p-8',
				order == '1' ? 'bg-teal-100' : '',
			)}
		>
			<div className="flex flex-col items-start justify-between">
				<h2 className="text-xl font-semibold text-cyan-950">{packageName}</h2>
				<p className="text-base text-cyan-950/80">{subtitle}</p>
			</div>
			<h3 className="inline-flex flex-row items-end gap-1 pt-4 text-3xl font-semibold text-gray-950">
				<NumberTicker value={parseInt(price)} direction="up" />
				{/* <span className="amount">{price}</span> */}
				ريال
				<span className="text-lg text-gray-950/40">/{duration}</span>
			</h3>
			<ul className="flex flex-col gap-4">
				{apps.map((app: { title: string; active: boolean }, index: any) => (
					<li
						key={'feature' + index}
						className={`flex flex-row items-center gap-2 text-gray-600 ${!app.active ? 'opacity-40 grayscale' : ''}`}
					>
						{AppIcons[index]}
						{app.title}
					</li>
				))}
			</ul>
			<CTAList ctas={ctas} className="*:h-12 *:w-full" />
			<div>{children}</div>
		</div>
	)
}

export default PricingBox
