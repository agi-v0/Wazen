import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import SingleAppHeader from '@/ui/modules/app-store/SingleAppHeader'
import CallToAction from '@/ui/modules/CallToAction'
import processMetadata from '@/lib/processMetadata'
import SuggestedApps from '@/ui/modules/app-store/SuggestedApps'

type Props = {
	params: { slug?: string; locale: string }
}

export default async function Page({ params }: Props) {
	setRequestLocale(params.locale)
	const app = await getPage(params)
	if (!app) notFound()
	return (
		<>
			<SingleAppHeader app={app} />

			<SuggestedApps />
			<CallToAction />
		</>
	)
}

export async function generateMetadata({ params }: Props) {
	setRequestLocale(params.locale)
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
