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
		<InteractiveDetails className="group relative">
			<summary className="flex h-8 items-center gap-1 rounded px-2 no-underline transition-all hover:text-cyan-700">
				<PiGlobe />
				{locale == 'en' ? 'EN' : 'AR'}
				<PiCaretRightBold className="size-3 translate-y-0 text-gray-500/50 transition-transform duration-300 group-open:rotate-90 group-hover:translate-y-[2px] md:rotate-90" />
			</summary>

			<ul className="anim-fade-to-b top-full flex flex-col justify-between rounded-lg border border-gray-100 bg-white p-2 shadow-md md:absolute">
				<li
					className="cursor-pointer rounded px-4 py-2 transition-all hover:bg-gray-50 hover:text-cyan-700"
					onClick={() => changeLocale('ar')}
				>
					Arabic
				</li>
				<li
					className="cursor-pointer rounded px-4 py-2 transition-all hover:bg-gray-50 hover:text-cyan-700"
					onClick={() => changeLocale('en')}
				>
					English
				</li>
			</ul>
		</InteractiveDetails>
	)
}

export default LocaleSwitcher
