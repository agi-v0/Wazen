import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { creativeModuleQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Modules from '@/components/ui/modules'
import processMetadata from '@/lib/processMetadata'
import { setRequestLocale } from 'next-intl/server'

type Props = {
	params: Promise<{ slug: string[]; locale: 'en' | 'ar' }>
}

export default async function Page({ params }: Props) {
	const resolvedParams = await params

	setRequestLocale(resolvedParams.locale)
	const page = await getPage(resolvedParams)
	if (!page) notFound()
	return <Modules modules={page?.modules} locale={resolvedParams.locale} />
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
		groq`*[
			_type == 'page' &&
			defined(metadata.slug.current) &&
			!(metadata.slug.current in ['index', '404'])
		].metadata.slug.current`,
	)
	return slugs.map((slug) => ({ slug: slug.split('/') }))
}

async function getPage(params: { slug: string[]; locale: 'en' | 'ar' }) {
	return await fetchSanity<Sanity.Page>(
		groq`*[
			_type == 'page' &&
			metadata.slug.current == $slug && language == '${params.locale}' &&
			!(metadata.slug.current in ['index', '404'])
		][0]{
			...,
			modules[]{
				...,
				ctas[]{
					...,
					link{
						...,
						internal->{ title, metadata }
					}
				},
				products[]{
					...,
						link{
							...,
							internal->{ title, metadata },
					}
				},
				categories[]->{title , title_en, _id},
				items[]->,
				logos[]->,
				partnerslogos[]->,
				plans[]->,
				testimonials[]->,
				callToActionDoc[]->,
				'headings': select(
					tableOfContents => content[style in ['h2', 'h3']]{
						style,
						'text': pt::text(@)
					}
				),
				${creativeModuleQuery}
			},
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			}
		}`,
		{
			params: {
				locale: params.locale,
				slug: params.slug?.join('/'),
			},
			tags: ['pages'],
		},
	)
}
