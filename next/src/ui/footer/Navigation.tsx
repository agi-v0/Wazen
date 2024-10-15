import Link from 'next/link'
import CTA from '../CTA'
// import { PiCaretLeftBold } from "@/ui/Icons"
import Image from 'next/image'
import { PiAt } from '@/ui/Icons'
import { PiMapPin } from '@/ui/Icons'
import { PiPhone } from '@/ui/Icons'
import { cn } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import Logo from '@/components/ui/logo'

export default async function Menu({ footerMenu, locale }: any) {
	const t = await getTranslations('Index')
	return (
		<nav className="fluid-gap flex w-full flex-col flex-wrap items-start justify-start font-medium md:grid md:grid-cols-2 md:justify-around lg:grid-cols-5">
			<div className="flex flex-col justify-start text-start text-sm font-normal lg:row-span-2">
				<Link className="mb-4 h-10 font-bold" href="/">
					<Logo className="h-6 w-auto" locale={locale} light />
				</Link>
				<p className="flex h-10 items-center text-balance font-medium">
					{t('The OS for your Business')}
				</p>
				<p className="flex h-10 flex-row items-center gap-2 text-white/60">
					<PiPhone className="size-4 flex-none text-center text-white" />{' '}
					920008293
				</p>
				<a
					className="flex h-10 flex-row items-center gap-2 text-white/60 transition-colors hover:text-white"
					href="mailto:info@wazen.sa"
				>
					<PiAt className="size-4 flex-none text-center text-white" />{' '}
					info@wazen.sa
				</a>
				<p className="flex h-fit flex-row items-center gap-2 text-white/60">
					<PiMapPin className="size-4 flex-none text-white" />
					<span>{t('Location')}</span>
				</p>
			</div>
			{footerMenu?.items?.map((item: any, key: any) => {
				const { label, links } = item
				return (
					<div
						key={key}
						className={links.length > 8 ? 'col-span-2' : 'col-span-1'}
					>
						<div className="grid h-10 items-center rounded text-start text-sm text-white">
							{label}
						</div>
						<ul
							className={cn(
								'grid grid-cols-1 text-start',
								links.length > 8 ? 'grid-cols-2 gap-x-4 lg:gap-x-12' : '',
							)}
						>
							{links?.map((link: any, key: any) => (
								<li key={key} className={cn('group')}>
									<CTA
										locale={locale}
										link={link}
										className="grid h-10 items-center text-sm text-white/60 no-underline transition-colors group-hover:text-white"
									>
										{link.label}
									</CTA>
									{/* <PiCaretLeftBold className="size-3 translate-x-0 text-gray-50/50 opacity-0 transition-transform duration-300 group-hover:-translate-x-1 group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1" /> */}
								</li>
							))}
						</ul>
					</div>
				)
			})}
		</nav>
	)
}
