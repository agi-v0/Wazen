import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import SingleAppHeader from '@/ui/modules/app-store/SingleAppHeader'
import CallToAction from '@/ui/modules/CallToAction'
import EmblaCarousel from '@/components/EmblaCarousel/embla-carousel-app-store'
import { EmblaOptionsType } from 'embla-carousel'
import processMetadata from '@/lib/processMetadata'
import Permissions from '@/ui/modules/app-store/Permissions'
import SuggestedApps from '@/ui/modules/app-store/SuggestedApps'

type Props = {
	params: { slug?: string; locale: string }
}

export default async function Page({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const app = await getPage(params)
	if (!app) notFound()
	return (
		<>
			<SingleAppHeader app={app} />
			<Permissions app={app} />

			{/* <EmblaCarousel
					slides={app.carousel}
					options={{
						direction: params.locale === 'en' ? 'ltr' : 'rtl',
						loop: true,
						duration: app?.carousel?.length * 10,
					}}
					locale={params.locale}
				/> */}

			<SuggestedApps />
			<CallToAction
			// callToActionDoc={[{ ...cta }]}
			/>
		</>
	)
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
				slug: 'integrations/' + params.slug,
			},
			tags: ['apps'],
		},
	)
}
