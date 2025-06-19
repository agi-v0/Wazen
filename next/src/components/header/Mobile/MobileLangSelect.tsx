'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import { Icon } from '@iconify-icon/react'
import { cn } from '@/lib/utils'
import { useTransition, useState } from 'react'

const MobileLangSelect = () => {
	const locale = useLocale()
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()
	const params = useParams()

	function onSelectChange(newLocale: 'en' | 'ar') {
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: newLocale },
			)
		})
		setIsOpen(false) // Close dropdown after selection
	}

	return (
		<div className="relative">
			{/* Mobile Language Trigger Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					'group relative inline-flex h-12 w-full items-center justify-center rounded-lg bg-white px-4 py-3',
					'text-sm font-medium text-cyan-950/80 transition-colors hover:bg-teal-50 hover:text-cyan-700',
					'min-h-[44px] touch-manipulation focus:bg-teal-50 focus:text-cyan-700 focus:outline-none',
				)}
				disabled={isPending}
			>
				<Icon
					icon="ph:globe"
					className="me-2 shrink-0 text-base leading-none"
				/>
				<span>{locale === 'ar' ? 'العربية' : 'English'}</span>
				<Icon
					icon="ph:caret-down-bold"
					className={cn(
						'ms-2 shrink-0 text-gray-400 transition-transform duration-200',
						isOpen && 'rotate-180',
					)}
				/>
			</button>

			{/* Mobile Language Options */}
			{isOpen && (
				<div className="absolute bottom-full left-0 right-0 z-50 mt-1 overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
					<button
						onClick={() => onSelectChange('ar')}
						className={cn(
							'w-full rounded px-3 py-2 text-start text-sm font-medium transition-colors',
							'touch-manipulation hover:bg-teal-50 hover:text-cyan-700',
							locale === 'ar' ? 'bg-teal-50 text-cyan-700' : 'text-gray-900',
						)}
						disabled={isPending}
					>
						<div className="flex items-center">
							<span className="me-3 text-lg">🇸🇦</span>
							<span>العربية</span>
							{locale === 'ar' && (
								<Icon icon="ph:check" className="ms-auto text-cyan-700" />
							)}
						</div>
					</button>

					<button
						onClick={() => onSelectChange('en')}
						className={cn(
							'w-full rounded px-3 py-2 text-start text-sm font-medium transition-colors',
							'touch-manipulation hover:bg-teal-50 hover:text-cyan-700',
							locale === 'en' ? 'bg-teal-50 text-cyan-700' : 'text-gray-900',
						)}
						disabled={isPending}
					>
						<div className="flex items-center">
							<span className="me-3 text-lg">🇺🇸</span>
							<span>English</span>
							{locale === 'en' && (
								<Icon icon="ph:check" className="ms-auto text-cyan-700" />
							)}
						</div>
					</button>
				</div>
			)}

			{/* Overlay to close dropdown when clicking outside */}
			{isOpen && (
				<div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
			)}
		</div>
	)
}

export default MobileLangSelect
