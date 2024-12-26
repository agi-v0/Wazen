import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import SingleAppHeader from '@/components/ui/modules/app-store/SingleAppHeader'
import CallToAction from '@/components/ui/modules/CallToAction'
import processMetadata from '@/lib/processMetadata'
import SuggestedApps from '@/components/ui/modules/app-store/SuggestedApps'

type Props = {
	params: Promise<{ slug?: string; locale: 'en' | 'ar' }>
}

export default async function Page({ params }: Props) {
	const resolvedParams = await params
	setRequestLocale(resolvedParams.locale)
	const app = await getPage(resolvedParams)
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
	const resolvedParams = await params
	setRequestLocale(resolvedParams.locale)
	const page = await getPage(resolvedParams)
	if (!page) notFound()
	return processMetadata(page, resolvedParams.locale)
}

export async function generateStaticParams() {
	const slugs = await fetchSanity<string[]>(
		groq`*[_type == 'app.store.app' && defined(metadata.slug.current)].metadata.slug.current`,
	)
	const x = slugs.flatMap((slug) => [
		{ slug, locale: 'ar' },
		{ slug, locale: 'en' },
	])
	console.log(x)
	return x
}

async function getPage(params: { slug?: string; locale: 'en' | 'ar' }) {
	console.log(params)
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
				slug: params.slug,
			},
			tags: ['apps'],
		},
	)
}
