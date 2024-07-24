'use client'
import { useState } from 'react'
import OfferList from './OfferList'
import PricingBox from './PricingBox'

const Pricing = () => {
	const [isMonthly, setIsMonthly] = useState(true)

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
					<PricingBox
						packageName="المجانية"
						price={"0"}
						duration={isMonthly ? 'شهرياً' : 'سنوياً'}
						subtitle="مناسبة للشركات التي تريد البدء بالتحول الرقمي"
					>
						<OfferList text="All UI Components" status="active" />
						<OfferList text="Use with Unlimited Projects" status="active" />
						<OfferList text="Commercial Use" status="active" />
						<OfferList text="Email Support" status="active" />
						<OfferList text="Lifetime Access" status="inactive" />
						<OfferList text="Free Lifetime Updates" status="inactive" />
					</PricingBox>
					<PricingBox
						packageName="الأساسية"
						price={isMonthly ? '399' : '1000'}
						duration={isMonthly ? 'شهرياً' : 'سنوياً'}
						subtitle="مناسبة للشركات والصغيرة والمتوسطة"
					>
						<OfferList text="All UI Components" status="active" />
						<OfferList text="Use with Unlimited Projects" status="active" />
						<OfferList text="Commercial Use" status="active" />
						<OfferList text="Email Support" status="active" />
						<OfferList text="Lifetime Access" status="active" />
						<OfferList text="Free Lifetime Updates" status="inactive" />
					</PricingBox>
					<PricingBox
						packageName="المتقدمة"
						price={isMonthly ? '589' : '2100'}
						duration={isMonthly ? 'شهرياً' : 'سنوياً'}
						subtitle="مناسبة للشركات والصغيرة والمتوسطة"
					>
						<OfferList text="All UI Components" status="active" />
						<OfferList text="Use with Unlimited Projects" status="active" />
						<OfferList text="Commercial Use" status="active" />
						<OfferList text="Email Support" status="active" />
						<OfferList text="Lifetime Access" status="active" />
						<OfferList text="Free Lifetime Updates" status="active" />
					</PricingBox>
				</div>
			</div>
		</section>
	)
}

export default Pricing
