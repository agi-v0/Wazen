'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import PricingCard from './PricingCard'
import { PiCheckBold } from '@/components/ui/Icons'
import { PiX } from '@/components/ui/Icons'
import { useTranslations } from 'next-intl'

const Pricing = ({ plans }: any) => {
	const t = useTranslations('Pricing')

	const [isYearly, setIsYearly] = useState(false)

	return (
		<div id="pricing" className="container space-y-6">
			<div className="flex w-full flex-row items-center justify-center gap-4 text-sm font-medium text-gray-400 rtl:flex-row-reverse">
				{t('Yearly (two months free)')}
				<Switch checked={isYearly} onCheckedChange={setIsYearly} />
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{plans.map((plan: any, index: number) => (
					<PricingCard
						key={index}
						order={index}
						apps={plan.apps}
						packageName={plan.title}
						price={isYearly ? plan.price.yearly : plan.price.monthly}
						duration={isYearly ? t('Yearly') : t('Monthly')}
						subtitle={plan.highlight}
						ctas={plan.ctas}
					>
						<ul className="flex flex-col gap-2">
							{plan.features &&
								plan.features.map(
									(feature: { title: string; active: boolean }, index: any) => (
										<li
											key={'feature' + index}
											className="flex flex-row items-center gap-2 text-sm text-gray-500"
										>
											{feature.active ? (
												<PiCheckBold className="size-4 text-gray-500" />
											) : (
												<PiX className="size-4 text-gray-400" />
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
