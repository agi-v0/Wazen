import CTAList from '@/ui/CTAList'
import {
	PiFlowArrowDuotone,
	PiIdentificationCardDuotone,
	PiTableDuotone,
	PiUserListDuotone,
	PiCheckBold,
	PiXBold,
} from 'react-icons/pi'

const PricingBox = (props: {
	price: string
	apps: any
	duration: string
	packageName: string
	subtitle: string
	children: React.ReactNode
	ctas: Sanity.CTA[]
}) => {
	const { price, apps, duration, packageName, subtitle, children, ctas } = props

	const AppIcons = [
		<PiTableDuotone className="text-2xl text-cyan-500" />,
		<PiIdentificationCardDuotone className="text-2xl text-yellow-500" />,
		<PiUserListDuotone className="text-2xl text-indigo-500" />,
		<PiFlowArrowDuotone className="text-2xl text-teal-500" />,
	]

	return (
		<div className="relative flex w-full flex-col justify-start gap-6 rounded-2xl bg-white p-6">
			<div className="flex flex-col items-start justify-between">
				<h4 className="text-dark text-xl font-bold">{packageName}</h4>
				<p className="text-base">{subtitle}</p>
			</div>
			<h3 className="pt-4 text-[32px] font-bold text-black">
				<span className="amount">{price}</span>ريال
				<span className="text-lg font-light">/{duration}</span>
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
