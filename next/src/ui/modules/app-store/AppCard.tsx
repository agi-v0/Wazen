import Link from 'next/link'
import Date from '@/ui/Date'
import Image from 'next/image'
import { PiArrowLineDownBold, PiCaretRightBold } from 'react-icons/pi'
import { useTranslations } from 'next-intl'
import Img from '@/ui/Img'

export default function AppCard({
	app,
	locale,
}: {
	app: {
		title: string
		icon: Sanity.Image
		description: any
		publishDate: string
	}
	locale: any
}) {
	const t = useTranslations('App store')

	return (
		<Link href="/" className="group w-full md:h-full">
			<div className="-hover:bg-teal-50 flex flex-col gap-[var(--text-large--font-size)] rounded-2xl bg-white p-6 group-hover:shadow-lg">
				{/* <div className="w-fit rounded-full text-sm text-gray-400">
					<Date value={app.publishDate} locale={locale} />
				</div> */}
				<Img
					image={app.icon}
					className="-border-4 size-20 rounded-2xl border-white object-cover shadow-md"
					imageWidth={300}
				/>
				<p className="text-larger font-semibold text-cyan-950">{app.title}</p>
				<p className="text-main text-gray-600 group-hover:text-cyan-950/80">
					{app.description[0]?.children[0] &&
						app.description[0].children[0].text.slice(0, 160) + ' ...'}
				</p>
				<div className="-group-hover:border-2 group flex h-10 items-center justify-center gap-2 self-start rounded-full border-teal-100 bg-teal-50 px-4 font-medium text-teal-600 transition-all hover:bg-teal-100">
					<PiArrowLineDownBold className="inline-block size-4" />
					{t('Download')}
				</div>
			</div>
		</Link>
	)
}
