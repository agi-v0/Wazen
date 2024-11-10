import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { creativeModuleQuery } from '@/lib/sanity/queries'
import Modules from '@/components/ui/modules'
import processMetadata from '@/lib/processMetadata'

type Props = {
	params: Promise<{ locale: string }>
}

export default async function Page({ params }: Props) {
	const resolvedParams = await params
	const page = await getPage(resolvedParams.locale)
	return <Modules modules={page?.modules} locale={resolvedParams.locale} />
}

export async function generateMetadata({ params }: Props) {
	const resolvedParams = await params

	const page = await getPage(resolvedParams.locale)
	return processMetadata(page, resolvedParams.locale)
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
