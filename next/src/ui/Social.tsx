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
}: {
	staticLinks: any
	className: string
}) {
	const { social } = await getSite()

	if (!social?.items?.length) return null

	return (
		<nav
			className={cn(
				'flex flex-col-reverse flex-wrap gap-4 md:flex-row',
				className,
			)}
		>
			<div className="flex flex-col lg:flex-row  gap-6 items-center">
				<div dir="rtl">© 2024 وازن المالية. جميع الحقوق محفوظة</div>

				{staticLinks?.items?.map((item: any, key: any) => {
					const { label, links } = item

					return (
						<div key={key} className="cursor-default md:w-1/3 lg:w-fit ">
							<div className="text-start ">{label}</div>

							<ul className="text-start">
								{links?.map((link: any, key: any) => (
									<li key={key} className="h-8  text-white">
										<Link href="" className="no-underline hover:text-teal-600">
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					)
				})}
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
