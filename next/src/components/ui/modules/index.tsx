import dynamic from 'next/dynamic'
import Hero from './Hero'
import HeroTwo from './HeroTwo'
import HeroThree from './HeroThree'
import HeroFour from './HeroFour'
import { useMemo } from 'react'

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
// const dynamicComponents = {
// 	applications: dynamic(() => import('./FeaturesInfiniteScroll')),
// 	'app-store-rollup': dynamic(() => import('./app-store/Rollup')),
// 	'benefits-banner': dynamic(() => import('./BenefitsBanner')),
// 	'blog-rollup': dynamic(() => import('./blog/Rollup')),
// 	'brief-group': dynamic(() => import('./BriefGroup')),
// 	'home-brief-group': dynamic(() => import('./HomeBriefGroup')),
// 	brief: dynamic(() => import('./Brief')),
// 	'categories-list': dynamic(() => import('./blog/CategoriesList')),
// 	'help-center-categories-list': dynamic(() => import('./blog/CategoriesList')),
// 	'contact-us': dynamic(() => import('./ContactUs')),
// 	'creative-module': dynamic(() => import('./CreativeModule')),
// 	'custom-html': dynamic(() => import('./CustomHTML')),
// 	'faq-list': dynamic(() => import('./FAQList')),
// 	'features-grid': dynamic(() => import('./FeaturesGridOne')),
// 	'features-grid-2': dynamic(() => import('./FeaturesGridTwo')),
// 	'logo-list': dynamic(() => import('./LogoList')),
// 	partners: dynamic(() => import('./PartnersList')),
// 	'pricing-list': dynamic(() => import('./Plans')),
// 	'pricing-calculator': dynamic(() => import('./PlansCalculator')),
// 	'richtext-module': dynamic(() => import('./RichtextModule')),
// 	'single-testimony': dynamic(() => import('./SingleTestimony')),
// 	'solutions-benefits': dynamic(() => import('./Benefits')),
// 	'stat-list': dynamic(() => import('./StatList')),
// 	'call.to.action': dynamic(() => import('./CallToAction')),
// 	'call.to.action.two': dynamic(() => import('./CallToActionTwo')),
// 	'how-it-works': dynamic(() => import('./HowItWorks')),
// 	'testimonial-list': dynamic(() => import('./TestimonialList')),
// 	'testimonial-list-two': dynamic(() => import('./TestimonialListTwo')),
// 	'pricing-comparison': dynamic(() => import('./PlansComparison')),
// 	'product-list': dynamic(() => import('./ProductList')),
// }

export default function Modules({
	modules,
	locale,
}: {
	modules?: Sanity.Module[]
	locale?: string
}) {
	const dynamicComponents = useMemo(() => {
		const componentMap = new Map()

		modules?.forEach((module) => {
			if (!componentMap.has(module._type)) {
				switch (module._type) {
					case 'categories-list':
						componentMap.set(
							module._type,
							dynamic(() => import('./blog/CategoriesList')),
						)
						break
					case 'blog-rollup':
						componentMap.set(
							module._type,
							dynamic(() => import('./blog/Rollup')),
						)
						break
					case 'creative-module':
						componentMap.set(
							module._type,
							dynamic(() => import('./CreativeModule')),
						)
						break
					case 'custom-html':
						componentMap.set(
							module._type,
							dynamic(() => import('./CustomHTML')),
						)
						break
					case 'hero':
						componentMap.set(
							module._type,
							dynamic(() => import('./Hero')),
						)
						break
					case 'hero.four':
						componentMap.set(
							module._type,
							dynamic(() => import('./HeroFour')),
						)
						break
					case 'hero.three':
						componentMap.set(
							module._type,
							dynamic(() => import('./HeroThree')),
						)
						break
					case 'hero.two':
						componentMap.set(
							module._type,
							dynamic(() => import('./HeroTwo')),
						)
						break
					case 'logo-list':
						componentMap.set(
							module._type,
							dynamic(() => import('./LogoList')),
						)
						break
					case 'partners':
						componentMap.set(
							module._type,
							dynamic(() => import('./PartnersList')),
						)
						break
					case 'richtext-module':
						componentMap.set(
							module._type,
							dynamic(() => import('./RichtextModule')),
						)
						break
					case 'single-testimony':
						componentMap.set(
							module._type,
							dynamic(() => import('./SingleTestimony')),
						)
						break
					case 'call.to.action':
						componentMap.set(
							module._type,
							dynamic(() => import('./CallToAction')),
						)
						break
					case 'stat-list':
						componentMap.set(
							module._type,
							dynamic(() => import('./StatList')),
						)
						break
					case 'features-grid':
						componentMap.set(
							module._type,
							dynamic(() => import('./FeaturesGridOne')),
						)
						break
					case 'features-grid-2':
						componentMap.set(
							module._type,
							dynamic(() => import('./FeaturesGridTwo')),
						)
						break
					case 'contact-us':
						componentMap.set(
							module._type,
							dynamic(() => import('./ContactUs')),
						)
						break
					case 'brief-group':
						componentMap.set(
							module._type,
							dynamic(() => import('./BriefGroup')),
						)
						break
					case 'home-brief-group ':
						componentMap.set(
							module._type,
							dynamic(() => import('./HomeBriefGroup')),
						)
						break
					case 'pricing-list':
						componentMap.set(
							module._type,
							dynamic(() => import('./Plans')),
						)
						break
					case 'pricing-comparison':
						componentMap.set(
							module._type,
							dynamic(() => import('./PlansComparison')),
						)
						break
					case 'pricing-calculator':
						componentMap.set(
							module._type,
							dynamic(() => import('./PlansCalculator')),
						)
						break
					case 'benefits-banner':
						componentMap.set(
							module._type,
							dynamic(() => import('./BenefitsBanner')),
						)
						break
					case 'call.to.action.two':
						componentMap.set(
							module._type,
							dynamic(() => import('./CallToActionTwo')),
						)
						break
					case 'app-store-rollup':
						componentMap.set(
							module._type,
							dynamic(() => import('./app-store/Rollup')),
						)
						break
					case 'applications':
						componentMap.set(
							module._type,
							dynamic(() => import('./FeaturesInfiniteScroll')),
						)
						break
					case 'faq-list':
						componentMap.set(
							module._type,
							dynamic(() => import('./FAQList')),
						)
						break
					case 'brief':
						componentMap.set(
							module._type,
							dynamic(() => import('./Brief')),
						)
						break
					case 'solutions-benefits':
						componentMap.set(
							module._type,
							dynamic(() => import('./Benefits')),
						)
						break
					case 'how-it-works':
						componentMap.set(
							module._type,
							dynamic(() => import('./HowItWorks')),
						)
						break
					case 'product-list':
						componentMap.set(
							module._type,
							dynamic(() => import('./ProductList')),
						)
						break
					case 'testimonial-list':
						componentMap.set(
							module._type,
							dynamic(() => import('./TestimonialList')),
						)
						break
					case 'testimonial-list-two':
						componentMap.set(
							module._type,
							dynamic(() => import('./TestimonialListTwo')),
						)
						break

					// Add other cases here...
					default:
						break
				}
			}
		})

		return componentMap
	}, [modules])
	return (
		<>
			{modules?.map((module) => {
				const DynamicComponent = dynamicComponents.get(module._type)

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
					// Add other non-dynamic cases here...
					default:
						return <div data-type={module._type} key={module._key} />
				}
			})}
		</>
	)
}

// const MODULE_COMPONENTS = {
// 	'categories-list': dynamic(() => import('./blog/CategoriesList')),
// 	'blog-rollup': dynamic(() => import('./blog/Rollup')),
// 	'creative-module': dynamic(() => import('./CreativeModule')),
// 	'custom-html': dynamic(() => import('./CustomHTML')),
// 	hero: dynamic(() => import('./Hero')),
// 	'hero.four': dynamic(() => import('./HeroFour')),
// 	'hero.three': dynamic(() => import('./HeroThree')),
// 	'hero.two': dynamic(() => import('./HeroTwo')),
// 	'logo-list': dynamic(() => import('./LogoList')),
// 	partners: dynamic(() => import('./PartnersList')),
// 	'richtext-module': dynamic(() => import('./RichtextModule')),
// 	'single-testimony': dynamic(() => import('./SingleTestimony')),
// 	'call.to.action': dynamic(() => import('./CallToAction')),
// 	'stat-list': dynamic(() => import('./StatList')),
// 	'features-grid': dynamic(() => import('./FeaturesGridOne')),
// 	'features-grid-2': dynamic(() => import('./FeaturesGridTwo')),
// 	'contact-us': dynamic(() => import('./ContactUs')),
// 	'brief-group': dynamic(() => import('./BriefGroup')),
// 	'home-brief-group': dynamic(() => import('./HomeBriefGroup')),
// 	'pricing-list': dynamic(() => import('./Plans')),
// 	'pricing-comparison': dynamic(() => import('./PlansComparison')),
// 	'pricing-calculator': dynamic(() => import('./PlansCalculator')),
// 	'benefits-banner': dynamic(() => import('./BenefitsBanner')),
// 	'call.to.action.two': dynamic(() => import('./CallToActionTwo')),
// 	'app-store-rollup': dynamic(() => import('./app-store/Rollup')),
// 	applications: dynamic(() => import('./FeaturesInfiniteScroll')),
// 	'faq-list': dynamic(() => import('./FAQList')),
// 	brief: dynamic(() => import('./Brief')),
// 	'solutions-benefits': dynamic(() => import('./Benefits')),
// 	'how-it-works': dynamic(() => import('./HowItWorks')),
// 	'product-list': dynamic(() => import('./ProductList')),
// 	'testimonial-list': dynamic(() => import('./TestimonialList')),
// 	'testimonial-list-two': dynamic(() => import('./TestimonialListTwo')),
// } as const
