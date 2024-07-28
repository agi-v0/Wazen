'use client'
import { useState } from 'react'
import PricingBox from './PricingBox'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'
import { FiCheck } from 'react-icons/fi'
// import { RxCross2 } from 'react-icons/rx'

const Pricing = ({ tiers }: any) => {
	const [isMonthly, setIsMonthly] = useState(true)

	const TeirContent: PortableTextComponents = {
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
					{tiers.map((tier: any, index: string) => (
						<PricingBox
							key={index}
							packageName={tier.title}
							price={isMonthly ? tier.price.monthly : tier.price.yearly}
							duration={isMonthly ? 'شهرياً' : 'سنوياً'}
							subtitle={tier.highlight}
							ctas={tier.ctas}
						>
							<div className="flex flex-col gap-2">
								<PortableText value={tier.content} components={TeirContent} />
							</div>
						</PricingBox>
					))}
				</div>
			</div>
		</section>
	)
}

export default Pricing
