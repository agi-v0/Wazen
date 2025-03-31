import dynamic from 'next/dynamic'
import { createDataAttribute } from 'next-sanity'

// Static imports for commonly used components
import Hero from './Hero'
import HeroTwo from './HeroTwo'
import HeroThree from './HeroThree'
import HeroFour from './HeroFour'
import ProductList from './ProductList'
import HowItWorks from './HowItWorks'
import LogoList from './LogoList'



// Dynamic imports for less commonly used components
const Categories = dynamic(() => import('./blog/CategoriesList'))
const BlogRollup = dynamic(() => import('./blog/Rollup'))
const CreativeModule = dynamic(() => import('./CreativeModule'))
const Partners = dynamic(() => import('./PartnersList'))
const FeaturesGridOne = dynamic(() => import('./FeaturesGridOne'))
const FeaturesGridTwo = dynamic(() => import('./FeaturesGridTwo'))
const BriefGroup = dynamic(() => import('./BriefGroup'))
const HomeBriefGroup = dynamic(() => import('./HomeBriefGroup'))
const Plans = dynamic(() => import('./Plans'))
const PlansComparison = dynamic(() => import('./PlansComparison'))
const PlansCalculator = dynamic(() => import('./PlansCalculator'))
const BenefitsBanner = dynamic(() => import('./BenefitsBanner'))
const CallToActionTwo = dynamic(() => import('./CallToActionTwo'))
const AppStoreRollup = dynamic(() => import('./app-store/Rollup'))
const FeaturesInfiniteScroll = dynamic(() => import('./FeaturesInfiniteScroll'))
const CallToAction = dynamic(() => import('./CallToAction'))
const RichtextModule = dynamic(() => import('./RichtextModule'))
const StatList = dynamic(() => import('./StatList'))
const CustomHTML = dynamic(() => import('./CustomHTML'))
const ContactUs = dynamic(() => import('./ContactUs'))
const FAQList = dynamic(() => import('./FAQList'))
const Brief = dynamic(() => import('./Brief'))
const Benefits = dynamic(() => import('./Benefits'))
const SingleTestimony = dynamic(() => import('./SingleTestimony'))
const TestimonialList = dynamic(() => import('./TestimonialList'))
const TestimonialListTwo = dynamic(() => import('./TestimonialListTwo'))

const MODULE_MAP = {
	'categories-list': Categories,
	'blog-rollup': BlogRollup,
	'creative-module': CreativeModule,
	'custom-html': CustomHTML,
	hero: Hero,
	'hero.four': HeroFour,
	'hero.three': HeroThree,
	'hero.two': HeroTwo,
	'logo-list': LogoList,
	partners: Partners,
	'richtext-module': RichtextModule,
	'single-testimony': SingleTestimony,
	'call.to.action': CallToAction,
	'stat-list': StatList,
	'features-grid': FeaturesGridOne,
	'features-grid-2': FeaturesGridTwo,
	'contact-us': ContactUs,
	'brief-group': BriefGroup,
	'home-brief-group': HomeBriefGroup,
	'pricing-list': Plans,
	'pricing-comparison': PlansComparison,
	'pricing-calculator': PlansCalculator,
	'benefits-banner': BenefitsBanner,
	'call.to.action.two': CallToActionTwo,
	'app-store-rollup': AppStoreRollup,
	applications: FeaturesInfiniteScroll,
	'faq-list': FAQList,
	brief: Brief,
	'solutions-benefits': Benefits,
	'how-it-works': HowItWorks,
	'product-list': ProductList,
	'testimonial-list': TestimonialList,
	'testimonial-list-two': TestimonialListTwo,
} as const

export default function Modules({
	modules,
	locale,
	page,
}: {
	modules?: Sanity.Module[]
	locale?: string
	page?: Sanity.Page
}) {
	return (
		<>
			{modules?.map((module) => {
				if (!module) return null

				const Component = MODULE_MAP[module._type as keyof typeof MODULE_MAP]

				if (!Component) return null

				return (
					<Component
						{...module}
						locale={locale}
						data-sanity={
							!!page?._id &&
							createDataAttribute({
								id: page._id,
								type: page?._type,
								path: `page[_key == "${module._key}"]`,
							}).toString()
						}
						key={module._key}
					/>
				)
			})}
		</>
	)
}
