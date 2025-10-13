'use client'

import { useRouter } from 'next/navigation'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useLocale, useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { useOnClickOutside } from '@/hooks/use-click-outside'
import { ScrollArea } from './ui/scroll-area'

export function Modal({ children }: { children: React.ReactNode }) {
	const ref = useRef<HTMLDivElement>(null)
	const router = useRouter()
	const locale = useLocale()
	const [open, setIsOpen] = useState(true)
	const t = useTranslations('ContactUs')

	const wait = new Promise((resolve) => setTimeout(resolve, 2000))

	const handleClickOutside = () => {
		setIsOpen(false)
		wait.then(() => router.back())
	}

	useOnClickOutside(ref, handleClickOutside)

	return (
		<Dialog open={open} onOpenChange={handleClickOutside}>
			{/*<DialogTrigger asChild>
				<Button variant="outline">Share</Button>
			</DialogTrigger>*/}
			<DialogContent
				ref={ref}
				className="h-fit max-h-[calc(100svh-32px)] w-[calc(100vw-24px)] overflow-scroll rounded-2xl bg-white p-5"
			>
				{/*<DialogHeader className="mb-6">
					<DialogTitle className="text-larger text-cyan-950">
						{t('Contact Us')}
					</DialogTitle>
					<DialogDescription className="text-cyan-950/60">
						{t('Please fill the form below to contact us')}
					</DialogDescription>
				</DialogHeader>*/}
				<div
					className="flex h-full items-center gap-2 p-1"
					dir={locale === 'en' ? 'ltr' : 'rtl'}
				>
					{children}
				</div>
				{/*<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button
							type="button"
							variant="secondary"
							onClick={() => {
								router.back()
							}}
						>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>*/}
			</DialogContent>
		</Dialog>
	)
}
