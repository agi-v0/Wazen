import { cn } from '@/lib/utils'
import { Link } from '@/i18n/navigations'
import { PiCaretRightBold } from '@/ui/Icons'
import { getLocale, getTranslations } from 'next-intl/server'
import { fetchSanity, groq } from '@/lib/sanity/fetch'
import AppCard from './AppCard'

const SuggestedApps = async () => {
	const t = await getTranslations('App')
	const locale = await getLocale()

	const apps = await fetchSanity<any>(
		groq`*[_type == 'app.store.app' && language == $locale ]{
		 title, 
		 icon, 
		 description,
		 publishDate,
		 metadata {
                ...,
                'ogimage': image.asset->url
            }
		}`,
		{
			params: {
				locale: locale,
				limit: 3,
			},
			tags: ['apps'],
		},
	)

	const randomlySortedApps = apps
		.map((app: object) => ({ app, sort: Math.random() }))
		.sort((a: any, b: any) => a.sort - b.sort)
		.map(({ app }: { app: object }) => app)

	return (
		<section className="section fluid-gap py-12">
			<div className="flex flex-col items-center py-[var(--size--4rem)]">
				<div className="flex w-full justify-between py-6">
					<h2 className="h3 text-center font-semibold text-cyan-950">
						{t('You may also be interested in')}
					</h2>
					<Link
						href="/"
						className="group flex flex-row items-center justify-center rounded-lg py-3 font-medium text-teal-600 no-underline"
					>
						{t('View all')}
						<PiCaretRightBold className="size- translate-x-0 text-teal-600/60 opacity-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
					</Link>
				</div>

				<ul
					className={cn(
						'w-full gap-6',
						'grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
					)}
				>
					{randomlySortedApps.slice(0, 3)?.map((app: any, key: string) => {
						return (
							<li key={key}>
								<AppCard app={app} locale={locale} />
							</li>
						)
					})}
				</ul>
			</div>
		</section>
	)
}

export default SuggestedApps
