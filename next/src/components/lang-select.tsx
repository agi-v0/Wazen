'use client'

import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'
import { useRouter, usePathname } from '../i18n/navigations'

import { PiCaretRightBold, PiGlobe } from 'react-icons/pi'
import InteractiveDetails from '@/ui/header/InteractiveDetails'

const LangSelect = () => {
	const locale = useLocale()

	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const pathname = usePathname()
	const params = useParams()

	function onSelectChange(lang: string) {
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: lang },
			)
		})
	}

	return (
		<InteractiveDetails className="group relative">
			<summary className="flex h-8 items-center gap-1 rounded px-2 no-underline hover:bg-gray-500/5 hover:text-teal-600">
				<PiGlobe />
				{locale == 'en' ? 'EN' : 'AR'}
				<PiCaretRightBold className="size-3 translate-y-0 text-gray-500/50 transition-transform duration-300 group-open:rotate-90 group-hover:translate-y-[2px] md:rotate-90" />
			</summary>

			<ul className="anim-fade-to-b top-full flex flex-col justify-between rounded-lg border border-gray-100 bg-white p-2 shadow-md md:absolute">
				<li
					className="cursor-pointer rounded px-4 py-2 hover:bg-gray-500/5"
					onClick={() => onSelectChange('ar')}
				>
					Arabic
				</li>
				<li
					className="cursor-pointer rounded px-4 py-2 hover:bg-gray-500/5"
					onClick={() => onSelectChange('en')}
				>
					English
				</li>
			</ul>
		</InteractiveDetails>
	)
}

export default LangSelect
