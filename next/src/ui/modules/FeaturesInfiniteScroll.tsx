import dynamic from 'next/dynamic'
import { PortableText } from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { set2 } from '@/components/ui/portable-text'
import { useTranslations } from 'next-intl'
import ComparisonTable from './ComparisonTable'

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
	altApps,
	ctas,
	textAlign = 'center',
	alignItems,
}: Partial<{
	pretitle: string
	content: any
	cards: any
	locale: string
	altApps: any
	ctas: any
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
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
			>
				<Pretitle className="text-large font-semibold text-gray-400">
					{pretitle}
				</Pretitle>
				<PortableText value={content} components={set2} />
			</div>
			<div className="space-y-6">
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

			<ComparisonTable {...altApps} />
		</section>
	)
}
