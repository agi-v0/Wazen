import { fetchSanity } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import Modules from '@/components/ui/modules'

export default async function NotFound() {
	const page = await get404()
	if (!page)
		return (
			<div className="flex h-screen items-center justify-center">
				<h1 className="h1 text-center text-5xl">404</h1>
			</div>
		)
	return <Modules modules={page?.modules} />
}

export async function generateMetadata() {
	return (await get404())?.metadata
}

async function get404() {
	return await fetchSanity<Sanity.Page>({
		query: groq`*[_type == 'page' && metadata.slug.current == '404'][0]{
			...,
			modules[]{
				...,
				ctas[]{
					...,
					link{
						...,
						internal->{ title, metadata }
					}
				}
			}
		}`,
	})
}
