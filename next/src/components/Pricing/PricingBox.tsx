import CTAList from '@/ui/CTAList'
import { PiTableDuotone } from 'react-icons/pi'
import { PiFlowArrowLight } from 'react-icons/pi'
import { FaRegAddressCard } from 'react-icons/fa6'
import { BiSolidUserDetail } from 'react-icons/bi'

const PricingBox = (props: {
	price: string
	duration: string
	packageName: string
	subtitle: string
	children: React.ReactNode
	ctas: Sanity.CTA[]
}) => {
	const { price, duration, packageName, subtitle, children } = props

	const firstList = [
		{
			text: 'النظام المحاسبي',
			icon: <PiTableDuotone className="text-2xl text-cyan-600" />,
		},
		{
			text: 'إدارة الموارد البشرية',
			icon: <FaRegAddressCard className="text-2xl text-yellow-500" />,
		},
		{
			text: 'إدارة علاقات العملاء',
			icon: <BiSolidUserDetail className="text-2xl text-indigo-500" />,
		},
		{
			text: 'الأنشطة المخصصة',
			icon: <PiFlowArrowLight className="text-2xl text-teal-600" />,
		},
	]

	return (
		<div className="w-full rounded-md bg-white">
			<div className="shadow-three hover:shadow-one relative rounded-sm px-8 py-10">
				<div className="flex flex-col items-start justify-between">
					<h4 className="text-dark mb-2 text-xl font-bold">{packageName}</h4>
					<p className="mb-7 text-base">{subtitle}</p>
				</div>
				<h3 className="mb-2 text-[32px] font-bold text-black">
					<span className="amount">{price}</span>ريال
					<span className="text-lg font-light">/{duration}</span>
				</h3>
				<div className="my-6">
					{firstList.map((listItem, index) => (
						<div key={index} className="my-2 flex items-center gap-x-4">
							<div>{listItem.icon}</div>
							<p className="flex items-center">{listItem.text}</p>
						</div>
					))}
				</div>
				<div className="my-6 rounded-md border-2 border-teal-500/20">
					<button className="bg-primary hover:shadow-signUp flex w-full items-center justify-center rounded-sm p-3 text-base font-semibold transition duration-300 ease-in-out hover:bg-opacity-80">
						إبدأ تجربتك المجانية
					</button>
					{/* <CTAList ctas={ctas} className="w-full" /> */}
				</div>
				<div>{children}</div>
			</div>
		</div>
	)
}

export default PricingBox
