import Applications from './Applications'
import Benefits from './Benefits'
import Categories from './blog/CategoriesList'
import FirstPost from './blog/FirstPost'
import BlogRollup from './blog/Rollup'
import Brief from './Brief'
import CreativeModule from './CreativeModule'
import CustomHTML from './CustomHTML'
import FAQList from './FAQList'
import Hero from './Hero'
import HeroPostcard from './HeroPostcard'
import HeroThree from './HeroThree'
import HeroTwo from './HeroTwo'
import LogoList from './LogoList'
import Partners from './Partners'
import RichtextModule from './RichtextModule'
import SingleTestimony from './SingleTestimony'
import CallToAction from './CallToAction'
import StatList from './StatList'
import HowItWorks from './HowItWorks'
import TestimonialList from './TestimonialList'
import ProductList from './ProductList'
import Features from './Features'
import ContactUs from './ContactUs'
import BriefGroup from './BriefGroup'
import HomeBriefGroup from './HomeBriefGroup'
import Plans from './Plans'
import PlansComparison from './PlansComparison'

export default function Modules({
	modules,
	locale,
}: {
	modules?: Sanity.Module[]
	locale?: any
}) {
	return (
		<>
			{modules?.map((module) => {
				switch (module._type) {
					case 'applications':
						return <Applications {...module} key={module._key} />
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
					case 'contact-us':
						return <ContactUs {...module} key={module._key} locale={locale} />
					case 'creative-module':
						return <CreativeModule {...module} key={module._key} />
					case 'custom-html':
						return <CustomHTML {...module} key={module._key} />
					case 'faq-list':
						return <FAQList {...module} key={module._key} />
					case 'features-grid':
						return <Features {...module} key={module._key} />
					case 'first-post':
						return <FirstPost {...module} key={module._key} locale={locale}/>
					case 'hero':
						return <Hero {...module} key={module._key} />
					case 'hero.two':
						return <HeroTwo {...module} key={module._key} />
					case 'hero.three':
						return <HeroThree {...module} key={module._key} />
					case 'hero.postcard':
						return <HeroPostcard {...module} key={module._key} />
					case 'logo-list':
						return <LogoList {...module} key={module._key} />
					case 'partners':
						return <Partners {...module} key={module._key} />
					case 'pricing-list':
						return <Plans {...module} key={module._key} />
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
					case 'product-list':
						return <ProductList {...module} key={module._key} />
					default:
						return <div data-type={module._type} key={module._key} />
				}
			})}
		</>
	)
}
