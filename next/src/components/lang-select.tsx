'use client'

import { usePathname, useRouter, type Locale } from '@/i18n'

import { PiCaretRightBold, PiGlobe } from 'react-icons/pi'
import InteractiveDetails from '@/ui/header/InteractiveDetails'

const LocaleSwitcher = ({ locale }: { locale: Locale }) => {
	const pathname = usePathname()
	const router = useRouter()

	const changeLocale = (lang: any) => {
		const newLocale = lang

		router.replace(pathname, { locale: newLocale })
	}

	return (
		<div>
			<div className="flex items-center">
				<InteractiveDetails className="group relative">
					<summary className="flex h-8 items-center gap-1 rounded px-3 no-underline hover:bg-gray-500/5 hover:text-teal-600">
						<PiGlobe />
						{locale == 'ar' ? 'Arabic' : 'English'}
						<PiCaretRightBold className="size-3 translate-y-0 text-gray-500/50 transition-transform duration-300 group-open:rotate-90 group-hover:translate-y-[2px] md:rotate-90" />
					</summary>

					<ul className="anim-fade-to-b top-full flex flex-col justify-between gap-1 rounded-lg border border-gray-100 bg-white p-3 shadow-md md:absolute">
						<li
							className="cursor-pointer px-4 py-2 hover:bg-gray-500/5"
							onClick={() => changeLocale('ar')}
						>
							Arabic
						</li>
						<li
							className="cursor-pointer px-4 py-2 hover:bg-gray-500/5"
							onClick={() => changeLocale('en')}
						>
							English
						</li>
					</ul>
				</InteractiveDetails>
			</div>
		</div>
	)
}

export default LocaleSwitcher
