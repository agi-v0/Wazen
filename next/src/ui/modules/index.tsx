import dynamic from 'next/dynamic'
import { domAnimation, LazyMotion } from 'framer-motion'

// Dynamically import all components
const Components = {
	Applications: dynamic(() => import('./Applications')),
	Benefits: dynamic(() => import('./Benefits')),
	Categories: dynamic(() => import('./blog/CategoriesList')),
	BlogRollup: dynamic(() => import('./blog/Rollup')),
	Brief: dynamic(() => import('./Brief')),
	CreativeModule: dynamic(() => import('./CreativeModule')),
	CustomHTML: dynamic(() => import('./CustomHTML')),
	FAQList: dynamic(() => import('./FAQList')),
	Hero: dynamic(() => import('./Hero')),
	HeroFour: dynamic(() => import('./HeroFour')),
	HeroThree: dynamic(() => import('./HeroThree')),
	HeroTwo: dynamic(() => import('./HeroTwo')),
	LogoList: dynamic(() => import('./LogoList')),
	Partners: dynamic(() => import('./PartnersList')),
	RichtextModule: dynamic(() => import('./RichtextModule')),
	SingleTestimony: dynamic(() => import('./SingleTestimony')),
	CallToAction: dynamic(() => import('./CallToAction')),
	StatList: dynamic(() => import('./StatList')),
	HowItWorks: dynamic(() => import('./HowItWorks')),
	TestimonialList: dynamic(() => import('./TestimonialList')),
	ProductList: dynamic(() => import('./ProductList')),
	FeaturesGridOne: dynamic(() => import('./FeaturesGridOne')),
	FeaturesGridTwo: dynamic(() => import('./FeaturesGridTwo')),
	ContactUs: dynamic(() => import('./ContactUs')),
	BriefGroup: dynamic(() => import('./BriefGroup')),
	HomeBriefGroup: dynamic(() => import('./HomeBriefGroup')),
	Plans: dynamic(() => import('./Plans')),
	PlansComparison: dynamic(() => import('./PlansComparison')),
	PlansCalculator: dynamic(() => import('./PlansCalculator')),
	BenefitsBanner: dynamic(() => import('./BenefitsBanner')),
	CallToActionTwo: dynamic(() => import('./CallToActionTwo')),
	AppStoreRollup: dynamic(() => import('./app-store/Rollup')),
	FeaturesInfiniteScroll: dynamic(() => import('./FeaturesInfiniteScroll')),
	TestimonialListTwo: dynamic(() => import('./TestimonialListTwo')),
}
const loadFeatures = () => domAnimation
export default function Modules({
	modules,
	locale,
}: {
	modules?: Sanity.Module[]
	locale?: string
}) {
	return (
		<>
			{modules?.map((module) => {
				const Component = Components[module._type as keyof typeof Components]
				return Component ? (
					<LazyMotion features={loadFeatures()}>
						<Component {...module} key={module._key} locale={locale} />
					</LazyMotion>
				) : (
					<div data-type={module._type} key={module._key} />
				)
			})}
		</>
	)
}
