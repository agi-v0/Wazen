import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { creativeModuleQuery } from '@/lib/sanity/queries'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'

type Props = {
	params: { locale: string }
}

export default async function Page({ params }: Props) {
	const page = await getPage(params.locale)
	return <Modules modules={page?.modules} locale={params.locale} />
}

export async function generateMetadata({ params }: Props) {
	const page = await getPage(params.locale)
	return processMetadata(page, params.locale)
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
				plans[]->,
				partnerslogos[]->,
				testimonials[]->,
				callToActionDoc[]->,
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
