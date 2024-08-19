// 'use client'
import dynamic from 'next/dynamic'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { stegaClean } from '@sanity/client/stega'
import { EmblaOptionsType } from 'embla-carousel'
// import { InfiniteMovingCards } from '@/components/animated/infinite-moving-cards'
import { set2 } from '@/components/ui/portable-text'
import { useTranslations } from 'next-intl'

const InfiniteMovingCards = dynamic(
	() => import('@/components/animated/infinite-moving-cards-apps'),
)

const Features = (): { title: string; icon: string }[] => {
	const t = useTranslations('FeaturesInfiniteScroll')
	return [
		{
			title: t('Check in and check out'),
			icon: 'PiUserCheck',
		},
		{
			title: t('Employee info'),
			icon: 'PiIdentificationCard',
		},
		{
			title: t('Housing and accomodation'),
			icon: 'PiBuildingOffice',
		},
		{
			title: t('Insurance'),
			icon: 'PiShieldCheck',
		},
		{
			title: t('Salaries'),
			icon: 'PiMoney',
		},

		{
			title: t('Leads'),
			icon: 'PiFlagPennant',
		},
		{
			title: t('Contracts'),
			icon: 'PiScroll',
		},
		{
			title: t('Subscriptions'),
			icon: 'PiCalendarDots',
		},
		{
			title: t('Clients'),
			icon: 'PiUserRectangle',
		},
		{
			title: t('SMS and Whatsapp'),
			icon: 'PiChatCircleText',
		},

		{
			title: t('Sales'),
			icon: 'PiMoney',
		},
		{
			title: t('Purchases'),
			icon: 'PiMinusSquare',
		},
		{
			title: t('Inventory'),
			icon: 'PiWarehouse',
		},
		{
			title: t('Financial lists'),
			icon: 'PiInvoice',
		},
		{
			title: t('Cost centers'),
			icon: 'PiChartPie',
		},
	]
}

export default function FeaturesInfiniteScroll({
	pretitle,
	content,
	cards,
	locale,
	ctas,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	cards: any
	locale: string
	ctas: any
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const t = useTranslations('Blog')

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-main mx-auto max-w-xl text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	const direction = locale === 'en' ? 'ltr' : 'rtl'
	const OPTIONS: EmblaOptionsType = { direction: direction, loop: true }
	return (
		<section
			className={
				'fluid-vertical-space fluid-gap flex min-h-screen w-full flex-col items-center justify-evenly overflow-hidden'
			}
		>
			<div
				className={
					'mx-auto flex max-w-xl flex-col items-center gap-6 md:max-w-3xl'
				}
				style={{ textAlign: stegaClean(textAlign) }}
			>
				<Pretitle className="text-large font-semibold text-gray-400">
					{pretitle}
				</Pretitle>
				<PortableText value={content} components={set2} />
			</div>
			<div className="space-y-6" dir={direction}>
				{/* <EmblaCarousel slides={cards} options={OPTIONS} locale={locale} /> */}
				<InfiniteMovingCards
					direction="right"
					speed="slow"
					pauseOnHover={true}
					items={Features().slice(0, 5)}
				/>
				<InfiniteMovingCards
					direction="left"
					speed="slow"
					pauseOnHover={true}
					items={Features().slice(5, 10)}
				/>
				<InfiniteMovingCards
					direction="right"
					speed="slow"
					pauseOnHover={true}
					items={Features().slice(10, 15)}
				/>
			</div>
		</section>
	)
}
