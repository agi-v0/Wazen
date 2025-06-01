import { fetchSanity } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import dynamic from 'next/dynamic'

const RollupClient = dynamic(() => import('./RollupClient'))

export default async function Rollup({
	_type,
	title,
	limit = 3,
	category,
	layout,
	categoryRef = category?.length > 0 ? category[0]?._ref : null,
	locale,
}: Partial<{
	_type: string
	title: string
	limit?: number
	category: any
	categoryRef: any
	layout: 'grid' | 'carousel'
	locale: 'en' | 'ar'
}>) {
	const props = { _type, title, limit, categoryRef, locale }

	const type = (() => {
		const isBlogPost = _type === 'categories-list'
		const baseType = isBlogPost ? 'blog.post' : 'help.center.post'
		return locale === 'en' ? `${baseType}.en` : baseType
	})()

	const initialPosts = await fetchSanity<Sanity.BlogPost[]>({
		query: groq`*[_type == $type && $categoryRef in categories[]->_id]|order(publishDate desc)[0...$limit]{
		 title,
			publishDate,
			metadata,
			body,
		 categories[]->{
			title,
			title_en
		 }
		}`,

		params: {
			limit,
			categoryRef,
			type: type,
		},
	})
	return (
		initialPosts.length > 0 && (
			<RollupClient {...props} initialPosts={initialPosts} />
		)
	)
}
