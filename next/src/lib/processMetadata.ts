import { getSite } from '@/lib/sanity/queries'
import processUrl from './processUrl'
import type { Metadata } from 'next'

export default async function processMetadata(
	page: Sanity.Page | Sanity.BlogPost,
	locale: string,
): Promise<Metadata> {
	const site = await getSite(locale)

	const url = processUrl(page)
	const { title, description, ogimage, noIndex } = page.metadata

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
			canonical: url,
			languages: { ar: url + 'ar', en: url + 'en' },
			types: {
				'application/rss+xml': '/blog/rss.xml',
			},
		},
	}
}
