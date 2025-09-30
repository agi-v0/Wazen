import { getSite } from '@/sanity/lib/queries'
import processUrl from './processUrl'
import type { Metadata } from 'next'

export default async function processMetadata(
	page: Sanity.Page | Sanity.BlogPost,
	locale: 'en' | 'ar',
): Promise<Metadata> {
	const site = await getSite(locale)

	const url = processUrl(page)
	const { title, description, ogimage, noIndex, slug } = page.metadata
	return {
		metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
		title,
		description,
		keywords:
			'نظام إدارة موارد، نظام وازن، نظام محاسبة، إدارة مالية، إدارة موارد بشرية، إدارة علاقات عملاء، إدارة نقاط البيع',
		openGraph: {
			type: 'website',
			url,
			title,
			description,
			images: ogimage || site.ogimage,
			siteName:
				locale == 'en'
					? 'Wazen ERP - Operating System for your Business'
					: 'وازن - النظام التشغيلي لأعمالك',
		},
		twitter: {
			card: 'summary_large_image',
			site: '@MyWazen',
			creator: '@MyWazen',
			images: ogimage || site.ogimage,
		},
		robots: {
			index: !noIndex,
		},
		creator: 'Studio Valence | byvalence.com',
		alternates: {
			canonical:
				process.env.NEXT_PUBLIC_BASE_URL +
				locale +
				//add directory if page is not homepage
				(slug.current !== 'index' ? `${directory(page)}/${slug.current}` : ''),
			languages: {
				ar:
					process.env.NEXT_PUBLIC_BASE_URL +
					'ar' +
					//add directory if page is not homepage
					(slug.current !== 'index'
						? `${directory(page)}/${slug.current}`
						: ''),
				en:
					process.env.NEXT_PUBLIC_BASE_URL +
					'en' +
					//add directory if page is not homepage
					(slug.current !== 'index'
						? `${directory(page)}/${slug.current}`
						: ''),
			},
			types: {
				'application/rss+xml': '/blog/rss.xml',
			},
		},
	}
}
const directory = (
	page: Sanity.Page | Sanity.BlogPost | Sanity.HelpCenterPost,
) => {
	switch (page?._type) {
		case 'blog.post':
			return '/blog'
		case 'help.center.post':
			return '/help-center'
		case 'app.store.app' as any:
			return '/integrations'
		default:
			return ''
	}
}
