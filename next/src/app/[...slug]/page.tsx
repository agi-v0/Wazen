import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { creativeModuleQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'

export default async function Page({ params }: Props) {
	const page = await getPage(params)
	if (!page) notFound()
	return <Modules modules={page?.modules} />
}

export async function generateMetadata({ params }: Props) {
	const page = await getPage(params)
	if (!page) notFound()
	return processMetadata(page)
}

export async function generateStaticParams() {
	const slugs = await fetchSanity<string[]>(
		groq`*[
			_type == 'page' &&
			defined(metadata.slug.current) &&
			!(metadata.slug.current in ['index', '404'])
		].metadata.slug.current`,
	)
	// console.log('All slugs:', slugs)
	return slugs.map((slug) => decodeURIComponent(slug))
}

async function getPage(params: Props['params']) {
	// console.log('Params.slug', params.slug)
	return await fetchSanity<Sanity.Page>(
		groq`*[
			_type == 'page' &&
			metadata.slug.current == $slug &&
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
				categories[]->,
				items[]->,
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
				slug: params.slug.join('/'),
			},
			tags: ['pages'],
		},
	)
}

type Props = {
	params: { slug?: any }
}
