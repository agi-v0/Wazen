import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import SingleAppHeader from '@/ui/modules/app-store/SingleAppHeader'
import CallToAction from '@/ui/modules/CallToAction'
import EmblaCarousel from '@/components/EmblaCarousel/embla-carousel-app-store'
import { EmblaOptionsType } from 'embla-carousel'
import processMetadata from '@/lib/processMetadata'

type Props = {
	params: { slug?: string; locale: string }
}

export default async function Page({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const app = await getPage(params)
	const cta = await callToAction(params)
	if (app) {
		return (
			<div>
				<SingleAppHeader app={app} />

				{/* <EmblaCarousel
					slides={app.carousel}
					options={{
						direction: params.locale === 'en' ? 'ltr' : 'rtl',
						loop: true,
						duration: app?.carousel?.length * 10,
					}}
					locale={params.locale}
				/> */}
				<CallToAction {...cta} />
			</div>
		)
	} else notFound()
}

export async function generateMetadata({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const page = await getPage(params)
	if (!page) notFound()
	return processMetadata(page, params.locale)
}

export async function generateStaticParams() {
	const slugs = await fetchSanity<string[]>(
		groq`*[_type == 'app.store.app' && defined(metadata.slug.current)].metadata.slug.current`,
	)
	return slugs.map((slug) => ({ slug }))
}

async function getPage(params: Props['params']) {
	return await fetchSanity<any>(
		groq`*[_type == 'app.store.app' && metadata.slug.current == $slug && language == $locale ][0]{
			..., 
			icon,
			asset->,
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			}
	 }`,
		{
			params: {
				locale: params.locale,
				slug: 'wazen-store/' + params.slug,
			},
			tags: ['apps'],
		},
	)
}

async function callToAction(params: Props['params']) {
	return await fetchSanity<Sanity.Module>(
		groq`*[_type == 'call.to.action.doc' && language == $locale][0]{
		...
		}`,
		{
			params: {
				locale: params.locale,
			},
			tags: ['apps'],
		},
	)
}
