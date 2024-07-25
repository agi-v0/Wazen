import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { creativeModuleQuery } from '@/lib/sanity/queries'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'

export default async function Page({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const page = await getPage(locale)
	return <Modules modules={page?.modules} />
}

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const page = await getPage(locale)
	return processMetadata(page, locale)
}

async function getPage(locale: string) {
	return await fetchSanity<Sanity.Page>(
		groq`*[_type == 'page' && metadata.slug.current == "index" && language == '${locale}'][0]{
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
				categories[]->{title},
				logos[]->,
				tiers[]->,
				partnerslogos[]->,
				testimonials[]->,
				items[]->,
				${creativeModuleQuery}
			},
			metadata {
				...,
				'ogimage': image.asset->url
			}
		}`,
		{
			tags: ['homepage'],
		},
	)
}
