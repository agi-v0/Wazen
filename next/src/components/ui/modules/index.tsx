import dynamic from 'next/dynamic'
import Hero from './Hero'
import HeroTwo from './HeroTwo'
import HeroThree from './HeroThree'
import HeroFour from './HeroFour'

const Categories = dynamic(() => import('./blog/CategoriesList'))
const BlogRollup = dynamic(() => import('./blog/Rollup'))
const CreativeModule = dynamic(() => import('./CreativeModule'))
const CustomHTML = dynamic(() => import('./CustomHTML'))
// const Hero = dynamic(() => import('./Hero'))
// const HeroFour = dynamic(() => import('./HeroFour'))
// const HeroThree = dynamic(() => import('./HeroThree'))
// const HeroTwo = dynamic(() => import('./HeroTwo'))
const LogoList = dynamic(() => import('./LogoList'))
const Partners = dynamic(() => import('./PartnersList'))
const RichtextModule = dynamic(() => import('./RichtextModule'))
const SingleTestimony = dynamic(() => import('./SingleTestimony'))
const CallToAction = dynamic(() => import('./CallToAction'))
const StatList = dynamic(() => import('./StatList'))
const FeaturesGridOne = dynamic(() => import('./FeaturesGridOne'))
const FeaturesGridTwo = dynamic(() => import('./FeaturesGridTwo'))
const ContactUs = dynamic(() => import('./ContactUs'))
const BriefGroup = dynamic(() => import('./BriefGroup'))
const HomeBriefGroup = dynamic(() => import('./HomeBriefGroup'))
const Plans = dynamic(() => import('./Plans'))
const PlansComparison = dynamic(() => import('./PlansComparison'))
const PlansCalculator = dynamic(() => import('./PlansCalculator'))
const BenefitsBanner = dynamic(() => import('./BenefitsBanner'))
const CallToActionTwo = dynamic(() => import('./CallToActionTwo'))
const AppStoreRollup = dynamic(() => import('./app-store/Rollup'))
const FeaturesInfiniteScroll = dynamic(() => import('./FeaturesInfiniteScroll'))
const FAQList = dynamic(() => import('./FAQList'))
const Brief = dynamic(() => import('./Brief'))
const Benefits = dynamic(() => import('./Benefits'))
const HowItWorks = dynamic(() => import('./HowItWorks'))
const ProductList = dynamic(() => import('./ProductList'))
const TestimonialList = dynamic(() => import('./TestimonialList'))
const TestimonialListTwo = dynamic(() => import('./TestimonialListTwo'))

const loadFeatures = () => import('@/lib/features').then((res) => res.default)
const dynamicComponents = {
	applications: dynamic(() => import('./FeaturesInfiniteScroll')),
	'app-store-rollup': dynamic(() => import('./app-store/Rollup')),
	'benefits-banner': dynamic(() => import('./BenefitsBanner')),
	'blog-rollup': dynamic(() => import('./blog/Rollup')),
	'brief-group': dynamic(() => import('./BriefGroup')),
	'home-brief-group': dynamic(() => import('./HomeBriefGroup')),
	brief: dynamic(() => import('./Brief')),
	'categories-list': dynamic(() => import('./blog/CategoriesList')),
	'help-center-categories-list': dynamic(() => import('./blog/CategoriesList')),
	'contact-us': dynamic(() => import('./ContactUs')),
	'creative-module': dynamic(() => import('./CreativeModule')),
	'custom-html': dynamic(() => import('./CustomHTML')),
	'faq-list': dynamic(() => import('./FAQList')),
	'features-grid': dynamic(() => import('./FeaturesGridOne')),
	'features-grid-2': dynamic(() => import('./FeaturesGridTwo')),
	'logo-list': dynamic(() => import('./LogoList')),
	partners: dynamic(() => import('./PartnersList')),
	'pricing-list': dynamic(() => import('./Plans')),
	'pricing-calculator': dynamic(() => import('./PlansCalculator')),
	'richtext-module': dynamic(() => import('./RichtextModule')),
	'single-testimony': dynamic(() => import('./SingleTestimony')),
	'solutions-benefits': dynamic(() => import('./Benefits')),
	'stat-list': dynamic(() => import('./StatList')),
	'call.to.action': dynamic(() => import('./CallToAction')),
	'call.to.action.two': dynamic(() => import('./CallToActionTwo')),
	'how-it-works': dynamic(() => import('./HowItWorks')),
	'testimonial-list': dynamic(() => import('./TestimonialList')),
	'testimonial-list-two': dynamic(() => import('./TestimonialListTwo')),
	'pricing-comparison': dynamic(() => import('./PlansComparison')),
	'product-list': dynamic(() => import('./ProductList')),
}

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
				const DynamicComponent =
					dynamicComponents[module._type as keyof typeof dynamicComponents]

				if (DynamicComponent) {
					return (
						<DynamicComponent {...module} key={module._key} locale={locale} />
					)
				}

				switch (module._type) {
					case 'hero':
						return <Hero {...module} key={module._key} />
					case 'hero.two':
						return <HeroTwo {...module} key={module._key} />
					case 'hero.three':
						return <HeroThree {...module} key={module._key} />
					case 'hero.four':
						return <HeroFour {...module} key={module._key} />
					default:
						return <div data-type={module._type} key={module._key} />
				}
			})}
		</>
	)
}

const MODULE_COMPONENTS = {
	'categories-list': dynamic(() => import('./blog/CategoriesList')),
	'blog-rollup': dynamic(() => import('./blog/Rollup')),
	'creative-module': dynamic(() => import('./CreativeModule')),
	'custom-html': dynamic(() => import('./CustomHTML')),
	hero: dynamic(() => import('./Hero')),
	'hero.four': dynamic(() => import('./HeroFour')),
	'hero.three': dynamic(() => import('./HeroThree')),
	'hero.two': dynamic(() => import('./HeroTwo')),
	'logo-list': dynamic(() => import('./LogoList')),
	partners: dynamic(() => import('./PartnersList')),
	'richtext-module': dynamic(() => import('./RichtextModule')),
	'single-testimony': dynamic(() => import('./SingleTestimony')),
	'call.to.action': dynamic(() => import('./CallToAction')),
	'stat-list': dynamic(() => import('./StatList')),
	'features-grid': dynamic(() => import('./FeaturesGridOne')),
	'features-grid-2': dynamic(() => import('./FeaturesGridTwo')),
	'contact-us': dynamic(() => import('./ContactUs')),
	'brief-group': dynamic(() => import('./BriefGroup')),
	'home-brief-group': dynamic(() => import('./HomeBriefGroup')),
	'pricing-list': dynamic(() => import('./Plans')),
	'pricing-comparison': dynamic(() => import('./PlansComparison')),
	'pricing-calculator': dynamic(() => import('./PlansCalculator')),
	'benefits-banner': dynamic(() => import('./BenefitsBanner')),
	'call.to.action.two': dynamic(() => import('./CallToActionTwo')),
	'app-store-rollup': dynamic(() => import('./app-store/Rollup')),
	applications: dynamic(() => import('./FeaturesInfiniteScroll')),
	'faq-list': dynamic(() => import('./FAQList')),
	brief: dynamic(() => import('./Brief')),
	'solutions-benefits': dynamic(() => import('./Benefits')),
	'how-it-works': dynamic(() => import('./HowItWorks')),
	'product-list': dynamic(() => import('./ProductList')),
	'testimonial-list': dynamic(() => import('./TestimonialList')),
	'testimonial-list-two': dynamic(() => import('./TestimonialListTwo')),
} as const
