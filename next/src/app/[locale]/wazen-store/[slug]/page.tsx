import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import SingleAppHeader from '@/ui/modules/app-store/SingleAppHeader'
import CallToAction from '@/ui/modules/CallToAction'
import EmblaCarousel from '@/components/EmblaCarousel/embla-carousel-testimonials'
import { EmblaOptionsType } from 'embla-carousel'

type Props = {
	params: { slug?: string; locale: string }
}

export async function generateStaticParams() {
	const slugs = await fetchSanity<string[]>(
		groq`*[_type == 'app.store.app' && defined(metadata.slug.current)].metadata.slug.current`,
	)

	return slugs.map((slug) => ({ slug }))
}

async function getStaticProps(params: Props['params']) {
	const decodedSlug = decodeURIComponent(params.slug || '')



	return await fetchSanity<Sanity.BlogPost>(
		groq`*[_type == 'app.store.app' && metadata.slug.current == 'wazen-store/${params.slug}' && language == $locale ]{
			title, 
			icon, 
			ctas,
			description,
			publishDate,
			metadata
	 }`,
		{
			params: {
				locale: params.locale,
			},
			tags: ['apps'],
		},
	)
}

export default async function getStaticPaths({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const app = await getStaticProps(params)
	if (!app) notFound()

		const direction = params.locale === 'en' ? 'ltr' : 'rtl'
		const OPTIONS: EmblaOptionsType = {
			direction: direction,
			loop: true,
			// duration: allTestimonials.length * 10,
		}

	return (
		<div>
			<SingleAppHeader app={app} />
			<EmblaCarousel
				slides={[]}
				options={OPTIONS}
				locale={params.locale}
			/>
			<CallToAction  />
		</div>
	)
}
