import Link from 'next/link'
import Date from '@/ui/Date'
import Image from 'next/image'
import { PiCaretRightBold } from 'react-icons/pi'
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
	const t = useTranslations('Blog')

	return (
		<Link href="/" className="group w-full md:h-full">
			<div className="flex flex-col gap-[var(--text-large--font-size)] rounded-2xl bg-white p-6 hover:bg-teal-50 group-hover:shadow-lg">
				{/* <div className="w-fit rounded-full text-sm text-gray-400">
					<Date value={app.publishDate} locale={locale} />
				</div> */}
				<Img
					image={app.icon}
					className="-border-4 size-20 rounded-2xl border-white object-cover shadow-md"
					imageWidth={300}
				/>
				<p className="text-larger font-semibold text-cyan-950 group-hover:text-teal-600">
					{app.title}
				</p>
				<p className="text-main text-gray-600 group-hover:text-cyan-950/80">
					{app.description[0]?.children[0] &&
						app.description[0].children[0].text.slice(0, 160) + ' ...'}
				</p>
			</div>
		</Link>
	)
}
