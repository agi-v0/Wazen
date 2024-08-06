import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { creativeModuleQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'
import { unstable_setRequestLocale } from 'next-intl/server'

type Props = {
	params: { slug: string[]; locale: string }
}

export default async function Page({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const page = await getPage(params)
	if (!page) notFound()
	return <Modules modules={page?.modules} locale={params.locale} />
}

export async function generateMetadata({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const page = await getPage(params)
	if (!page) notFound()
	return processMetadata(page, params.locale)
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

async function getPage(params: Props['params']) {
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
				categories[]->{title , title_en},
				items[]->,
				logos[]->,
				partnerslogos[]->,
				plans[]->,
				testimonials[]->,
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
				'ogimage': image.asset->url
			}
		}`,
		{
			params: {
				locale: params.locale,
				slug: params.slug.join('/'),
			},
			tags: ['pages'],
		},
	)
}
