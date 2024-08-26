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
				'relative flex w-full flex-col justify-start gap-6 rounded-2xl border border-gray-200 bg-white p-8',
				order == '1'
					? 'border border-teal-500 shadow-[0px_0px_0px_4px_rgba(20,184,166,0.2),_0px_1px_2px_-1px_rgba(28,_40,_64,_0.10),_0px_2px_4px_0px_rgba(28,_40,_64,_0.06)]'
					: '',
			)}
		>
			<div className="flex flex-col items-start justify-between">
				<h2 className="text-base font-semibold text-gray-950">{packageName}</h2>
				<p className="text-sm text-gray-600">{subtitle}</p>
			</div>
			<h3 className="inline-flex flex-row items-end gap-1 pt-4 text-3xl font-semibold text-gray-950">
				{/* <NumberTicker value={parseInt(price)} direction="up" /> */}
				<span className="amount">{price}</span>
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
			<CTAList ctas={ctas} className="*:h-12 *:w-full *:text-base" />
			<div>{children}</div>
		</div>
	)
}

export default PricingBox
