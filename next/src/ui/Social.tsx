import { getSite } from '@/lib/sanity/queries'
import CTA from './CTA'
import { cn } from '@/lib/utils'

import {
	FaFacebookF,
	FaGithub,
	FaInstagram,
	FaLinkedinIn,
	FaTiktok,
	FaXTwitter,
	FaYoutube,
} from 'react-icons/fa6'
import { IoIosLink } from 'react-icons/io'
import Link from 'next/link'

export default async function Social({
	staticLinks,
	className,
	locale,
}: {
	staticLinks: any
	className: string
	locale: any
}) {
	const { social } = await getSite(locale)

	if (!social?.items?.length) return null

	return (
		<nav
			className={cn(
				'flex flex-col-reverse flex-wrap items-start gap-4 md:flex-row',
				className,
			)}
		>
			<div className="flex flex-col items-start gap-8 lg:flex-row">
				<div dir="rtl">© 2024 وازن المالية. جميع الحقوق محفوظة</div>

				<div className="inline-flex gap-4 text-start">
					{staticLinks?.items?.map((item: any, key: any) => {
						return (
							<CTA
								key={key}
								link={item}
								locale={locale}
								className="no-underline transition-all hover:text-white/50"
							/>
						)
					})}
				</div>
			</div>

			<div className="group flex flex-wrap items-center">
				{social.items.map((item, key) => {
					switch (item._type) {
						case 'link':
							return (
								<CTA
									className="px-2 hover:!opacity-100 group-has-[a:hover]:opacity-50"
									link={item}
									key={key}
								>
									<Icon url={item.external} aria-label={item.label} />
								</CTA>
							)

						default:
							return null
					}
				})}
			</div>
		</nav>
	)
}

function Icon({
	url,
	...props
}: { url?: string } & React.HTMLProps<SVGElement>) {
	if (!url) return null

	return url?.includes('facebook.com') ? (
		<FaFacebookF {...props} />
	) : url?.includes('github.com') ? (
		<FaGithub {...props} />
	) : url?.includes('instagram.com') ? (
		<FaInstagram {...props} />
	) : url?.includes('linkedin.com') ? (
		<FaLinkedinIn {...props} />
	) : url?.includes('tiktok.com') ? (
		<FaTiktok {...props} />
	) : url?.includes('twitter.com') || url?.includes('x.com') ? (
		<FaXTwitter {...props} />
	) : url?.includes('youtube.com') ? (
		<FaYoutube {...props} />
	) : (
		<IoIosLink {...props} />
	)
}
