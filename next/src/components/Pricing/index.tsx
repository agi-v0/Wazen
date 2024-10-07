'use client'
import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import PricingCard from './PricingCard'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'
import { PiCheckBold, PiX } from 'react-icons/pi'

const Pricing = ({ plans }: any) => {
	const [isYearly, setIsYearly] = useState(false)

	const PlanContent: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				const textContent = value.children
					.map((child: any) => child.text)
					.join('')
				if (!textContent.trim()) return null // Do not render if text content is empty or just whitespace

				return (
					<div className="flex items-center gap-2">
						{/* {status === 'active' ? (
							<FiCheck className="text-green-600" />
						) : (
							<RxCross2 className="text-red-600" />
						)} */}
						<PiCheckBold className="text-green-600" />
						<p className="text-base font-medium">{textContent}</p>
					</div>
				)
			},
		},
	}

	return (
		<div id="pricing" className="container space-y-6">
			<div className="flex w-full flex-row items-center justify-center gap-4 text-sm font-medium text-gray-400 rtl:flex-row-reverse">
				سنوي (شهرين مجاناً)
				<Switch checked={isYearly} onCheckedChange={setIsYearly} />
			</div>

			<div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
				{plans.map((plan: any, index: number) => (
					<PricingCard
						key={index}
						order={index}
						apps={plan.apps}
						packageName={plan.title}
						price={isYearly ? plan.price.yearly : plan.price.monthly}
						duration={isYearly ? 'سنوياً' : 'شهرياً'}
						subtitle={plan.highlight}
						ctas={plan.ctas}
					>
						<ul className="flex flex-col gap-2">
							{plan.features &&
								plan.features.map(
									(feature: { title: string; active: boolean }, index: any) => (
										<li
											key={'feature' + index}
											className="flex flex-row items-center gap-2 text-sm text-gray-600"
										>
											{feature.active ? (
												<PiCheckBold className="text-gray-600" />
											) : (
												<PiX className="text-gray-500" />
											)}
											{feature.title}
										</li>
									),
								)}
						</ul>
					</PricingCard>
				))}
			</div>
		</div>
	)
}

export default Pricing
