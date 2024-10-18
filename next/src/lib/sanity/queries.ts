import { fetchSanity, groq } from './fetch'

const navigationQuery = groq`
	title,
	items[]{
		...,
		internal->{ _type, title, metadata },
		links[]{
			...,
			internal->{ _type, title, metadata },
			links[]{
			..., 
			internal->{ _type, title, metadata }
			}
		}
	}
`

export const creativeModuleQuery = groq`
	modules[]{
		...,
		subModules[]{
			...,
			ctas[]{
				...,
				link{
					...,
					internal->{ title, metadata }
				}
			}
		}
	}
`

export async function getSite(locale: any) {
	return await fetchSanity<Sanity.Site>(
		groq`
			*[_type == 'site' && language == $locale  ][0]{
				...,
				ctas[]{
					...,
					link{
						...,
						internal->{ _type, title, metadata }
					}
				},
				headerMenu->{ ${navigationQuery} },
				footerMenu->{ ${navigationQuery} },
				social->{ ${navigationQuery} },
				staticLinks->{ ${navigationQuery} },
				'ogimage': ogimage.asset->url,
				"contactInfo": *[_type == 'page' && metadata.slug.current == "contact-us" && language == $locale][0]{
					"contactInfo": modules[0].contactInfo
				}
			}
		`,
		{
			params: {
				locale: locale,
			},
			tags: ['site'],
		},
	)
}
