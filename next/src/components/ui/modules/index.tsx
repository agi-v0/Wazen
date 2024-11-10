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

export default function Modules({
	modules,
	locale,
}: {
	modules?: Sanity.Module[]
	locale?: string
}) {
	return (
		<>
			{/* <LazyMotion features={loadFeatures}> */}
			{modules?.map((module) => {
				switch (module._type) {
					case 'applications':
						return (
							<FeaturesInfiniteScroll
								{...module}
								key={module._key}
								locale={locale}
							/>
						)
					case 'app-store-rollup':
						return <AppStoreRollup {...module} key={module._key} />
					case 'benefits-banner':
						return <BenefitsBanner {...module} key={module._key} />
					case 'blog-rollup':
						return <BlogRollup {...module} key={module._key} locale={locale} />
					case 'brief-group':
						return <BriefGroup {...module} key={module._key} />
					case 'home-brief-group':
						return <HomeBriefGroup {...module} key={module._key} />
					case 'brief':
						return <Brief {...module} key={module._key} />
					case 'categories-list':
						return <Categories {...module} key={module._key} locale={locale} />
					case 'help-center-categories-list':
						return <Categories {...module} key={module._key} locale={locale} />
					case 'contact-us':
						return <ContactUs {...module} key={module._key} locale={locale} />
					case 'creative-module':
						return <CreativeModule {...module} key={module._key} />
					case 'custom-html':
						return <CustomHTML {...module} key={module._key} />
					case 'faq-list':
						return <FAQList {...module} key={module._key} />
					case 'features-grid':
						return <FeaturesGridOne {...module} key={module._key} />
					case 'features-grid-2':
						return <FeaturesGridTwo {...module} key={module._key} />
					case 'hero':
						return <Hero {...module} key={module._key} />
					case 'hero.two':
						return <HeroTwo {...module} key={module._key} />
					case 'hero.three':
						return <HeroThree {...module} key={module._key} />
					case 'hero.four':
						return <HeroFour {...module} key={module._key} />
					case 'logo-list':
						return <LogoList {...module} key={module._key} />
					case 'partners':
						return <Partners {...module} key={module._key} />
					case 'pricing-list':
						return <Plans {...module} key={module._key} />
					case 'pricing-calculator':
						return (
							<PlansCalculator {...module} locale={locale} key={module._key} />
						)
					case 'richtext-module':
						return <RichtextModule {...module} key={module._key} />
					case 'single-testimony':
						return <SingleTestimony {...module} key={module._key} />
					case 'solutions-benefits':
						return <Benefits {...module} key={module._key} />
					case 'stat-list':
						return <StatList {...module} key={module._key} />
					case 'call.to.action':
						return <CallToAction {...module} key={module._key} />
					case 'call.to.action.two':
						return <CallToActionTwo {...module} key={module._key} />
					case 'how-it-works':
						return <HowItWorks {...module} key={module._key} />
					case 'testimonial-list':
						return (
							<TestimonialList {...module} key={module._key} locale={locale} />
						)
					case 'testimonial-list-two':
						return (
							<TestimonialListTwo
								{...module}
								key={module._key}
								locale={locale}
							/>
						)
					case 'pricing-comparison':
						return (
							<PlansComparison {...module} key={module._key} locale={locale} />
						)
					case 'product-list':
						return <ProductList {...module} key={module._key} />
					default:
						return <div data-type={module._type} key={module._key} />
				}
			})}
			{/* </LazyMotion> */}
		</>
	)
}
