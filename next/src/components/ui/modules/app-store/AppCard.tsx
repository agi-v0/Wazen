import { Link } from '@/i18n/routing'
import { PiArrowLineDownBold } from '@/components/ui/Icons'
import { useTranslations } from 'next-intl'
import Img from '@/components/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'

export default function AppCard({
	app,
	locale,
}: {
	app: {
		title: string
		icon: Sanity.Image
		description?: any
		publishDate: string
		metadata: Sanity.Metadata
	}
	locale: any
}) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				return (
					<p className="text-main text-gray-600 group-hover:text-cyan-950/80">
						{value.children
							.map((child: any) => child.text)
							.join('')
							.slice(0, 76) + ' ...'}
					</p>
				)
			},
		},
	}
	const t = useTranslations('App store')

	return (
		<Link href={app.metadata.slug.current} className="group w-full md:h-full">
			<div className="-hover:bg-teal-50 flex flex-col gap-[var(--text-large--font-size)] rounded-2xl bg-white p-6 transition-all group-hover:bg-teal-50">
				{/* <div className="w-fit rounded-full text-sm text-gray-400">
					<Date value={app.publishDate} locale={locale} />
				</div> */}
				<Img
					image={app.icon}
					className="-border-4 size-20 rounded-2xl border-white object-cover shadow-md"
					imageWidth={300}
				/>
				<p className="text-larger font-semibold text-cyan-950">{app.title}</p>
				{/* <p className="text-main text-gray-600 group-hover:text-cyan-950/80">
					{app.description[0]?.children[0] &&
						app.description[0].children[0].text.slice(0, 160) + ' ...'}
				</p> */}
				<PortableText value={app.description} components={components} />

				<div className="-group-hover:border-2 group flex h-10 items-center justify-center gap-2 self-start rounded-full px-4 font-medium text-teal-600 transition-all hover:bg-white">
					<PiArrowLineDownBold className="inline-block size-4" />
					{t('Download')}
				</div>
			</div>
		</Link>
	)
}
