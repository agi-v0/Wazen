import dynamic from 'next/dynamic'

// import Applications from './Applications'
// import Benefits from './Benefits'
import Categories from './blog/CategoriesList'
import FirstPost from './blog/FirstPost'
import BlogRollup from './blog/Rollup'
// import Brief from './Brief'
import CreativeModule from './CreativeModule'
import CustomHTML from './CustomHTML'
// import FAQList from './FAQList'
// import Hero from './Hero'
import HeroFour from './HeroFour'
import HeroThree from './HeroThree'
import HeroTwo from './HeroTwo'
import LogoList from './LogoList'
import Partners from './PartnersList'
import RichtextModule from './RichtextModule'
import SingleTestimony from './SingleTestimony'
import CallToAction from './CallToAction'
import StatList from './StatList'
// import HowItWorks from './HowItWorks'
// import TestimonialList from './TestimonialList'
// import ProductList from './ProductList'
import FeaturesGridOne from './FeaturesGridOne'
import FeaturesGridTwo from './FeaturesGridTwo'

import ContactUs from './ContactUs'
import BriefGroup from './BriefGroup'
// import HomeBriefGroup from './HomeBriefGroup'
import Plans from './Plans'
import PlansComparison from './PlansComparison'
import PlansCalculator from './PlansCalculator'
import BenefitsBanner from './BenefitsBanner'
import CallToActionTwo from './CallToActionTwo'
import AppStoreRollup from './app-store/Rollup'
import FeaturesInfiniteScroll from './FeaturesInfiniteScroll'

const Applications = dynamic(() => import('./Applications'))
const Benefits = dynamic(() => import('./Benefits'))
const HomeBriefGroup = dynamic(() => import('./HomeBriefGroup'))
const Brief = dynamic(() => import('./Brief'))
const TestimonialList = dynamic(() => import('./TestimonialList'))
const TestimonialListTwo = dynamic(() => import('./TestimonialListTwo'))
const ProductList = dynamic(() => import('./ProductList'))
const FAQList = dynamic(() => import('./FAQList'))
const HowItWorks = dynamic(() => import('./HowItWorks'))
const Hero = dynamic(() => import('./Hero'))

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
					case 'first-post':
						return <FirstPost {...module} key={module._key} locale={locale} />
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
					case 'pricing-comparison':
						return <PlansComparison {...module} key={module._key} />
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
					case 'how-it-works':
						return <HowItWorks {...module} key={module._key} />
					case 'testimonial-list':
						return <TestimonialList {...module} key={module._key} />
					case 'testimonial-list-two':
						return (
							<TestimonialListTwo
								{...module}
								key={module._key}
								locale={locale}
							/>
						)
					case 'product-list':
						return <ProductList {...module} key={module._key} />
					default:
						return <div data-type={module._type} key={module._key} />
				}
			})}
		</>
	)
}
