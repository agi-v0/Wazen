import { fetchSanity, groq } from '@/lib/sanity/fetch'
import AppCard from './AppCard'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import Link from 'next/link'
import { PiCaretRightBold } from 'react-icons/pi'
import { getTranslations, getLocale } from 'next-intl/server'

export default async function AppStoreRollup({
	limit = 100,
	category,
}: Partial<{
	limit?: number
	category: any
}>) {
	const locale = await getLocale()
	const t = await getTranslations('Blog')

	const apps = await fetchSanity<any>(
		groq`*[_type == 'app.store.app' && language == $locale ]{
		 title, 
		 icon, 
		 description,
		 publishDate
		}`,
		{
			params: {
				locale: locale,
				limit,
			},
			tags: ['apps'],
		},
	)

	if (apps)
		return (
			<section className="bg-white">
				<div className="section fluid-gap flex flex-col items-center py-[var(--size--4rem)]">
					<ul
						className={cn(
							'w-full gap-6',
							'grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
						)}
					>
						{apps?.map((app: any, key: string) => (
							<li key={key}>
								<AppCard app={app} locale={locale} />
							</li>
						))}
					</ul>
				</div>
			</section>
		)
}
