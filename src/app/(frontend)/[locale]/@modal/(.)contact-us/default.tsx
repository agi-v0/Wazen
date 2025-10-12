import Modules from '@/components/modules'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import groq from 'groq'

type Props = {
	params: Promise<{ locale: 'en' | 'ar' }>
}

export default async function Default({ params }: Props) {
	const resolvedParams = await params

	const page = await getPage(resolvedParams.locale)
	return <Modules modules={page?.modules} locale={resolvedParams.locale} />
}

async function getPage(locale: 'en' | 'ar') {
	return await fetchSanityLive({
		query: groq`*[_type == 'page' && metadata.slug.current == "contact-us" && language == '${locale}'][0]{
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
				_type == 'faq-list' => {
          sideNote {
            ...,
            link {
              ...,
              internal->{ title, metadata }
            }
          }
        },
				categories[]->{title, slug},
				logos[]->,
				plans[]->,
				partnerslogos[]->,
				testimonials[]->,
				items[]->,

			},
			metadata {
				...,
				'ogimage': image.asset->url
			}
		}`,
		params: {},
		tags: ['page'],
	})
}
