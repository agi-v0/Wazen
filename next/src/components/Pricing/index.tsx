'use client'
import { useState } from 'react'
import PricingCard from './PricingCard'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'
import { FiCheck } from 'react-icons/fi'
import { PiCheckBold, PiX } from 'react-icons/pi'
// import { RxCross2 } from 'react-icons/rx'

const Pricing = ({ plans }: any) => {
	const [isMonthly, setIsMonthly] = useState(true)

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
						<FiCheck className="text-green-600" />
						<p className="text-base font-medium">{textContent}</p>
					</div>
				)
			},
		},
	}

	return (
		<section id="pricing" className="relative py-16 md:py-20 lg:py-28">
			<div className="container">
				<div className="mb-8 flex justify-center md:mb-12 lg:mb-16">
					<div className="flex justify-between rounded-md bg-gray-50">
						<span
							onClick={() => setIsMonthly(true)}
							className={`${
								isMonthly
									? 'pointer-events-none border-2 border-teal-500/20 bg-white text-teal-600'
									: 'text-gray-600'
							} cursor-pointer rounded-md p-2 text-base font-semibold`}
						>
							شهري
						</span>
						<span
							onClick={() => setIsMonthly(false)}
							className={`${
								isMonthly
									? 'text-gray-600'
									: 'pointer-events-none border-2 border-teal-500/20 bg-white text-teal-600'
							} cursor-pointer rounded-md p-2 text-base font-semibold`}
						>
							سنوي (وفر شهرين مجانا!)
						</span>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
					{plans.map((plan: any, index: string) => (
						<PricingCard
							key={index}
							apps={plan.apps}
							packageName={plan.title}
							price={isMonthly ? plan.price.monthly : plan.price.yearly}
							duration={isMonthly ? 'شهرياً' : 'سنوياً'}
							subtitle={plan.highlight}
							ctas={plan.ctas}
						>
							<ul className="flex flex-col gap-2">
								{plan.features &&
									plan.features.map(
										(
											feature: { title: string; active: boolean },
											index: any,
										) => (
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
		</section>
	)
}

export default Pricing
