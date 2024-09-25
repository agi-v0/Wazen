import { fetchSanity, groq } from '@/lib/sanity/fetch'
import PostPreview from './PostPreview'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import { Link } from '@/i18n/navigations'
import { PiCaretRightBold } from 'react-icons/pi'
import { getTranslations } from 'next-intl/server'
import RollupClient from './RollupClient'
import { NextIntlClientProvider } from 'next-intl'

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
	locale: string
}>) {
	const props = { _type, title, limit, categoryRef, locale }
	const t = await getTranslations('Blog')

	const type =
		// 'help-center-categories-list'
		_type === 'categories-list'
			? locale === 'ar'
				? 'blog.post'
				: 'blog.post.en'
			: locale === 'ar'
				? 'help.center.post'
				: 'help.center.post.en'

	const initialPosts = await fetchSanity<Sanity.BlogPost[]>(
		groq`*[_type == $type && $categoryRef in categories[]->_id]|order(publishDate desc)[0...$limit]{
		 title,
			publishDate,
			metadata,
			body,
		 categories[]->{
			title,
			title_en
		 }
		}`,
		{
			params: {
				limit,
				categoryRef,
				type: type,
			},
			tags: ['posts'],
		},
	)
	return <RollupClient {...props} initialPosts={initialPosts} />
}
