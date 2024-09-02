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

const Competitors = (): { title: string; icon: any }[] => {
	const t = useTranslations('FeaturesInfiniteScroll')
	return [
		{
			title: t('Odoo'),
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
				>
					<rect width="24" height="24" fill="#A24689" rx="6" />
					<path
						fill="#fff"
						d="M12.033 4.224c1.08 0 2.1.215 3.058.644a8.407 8.407 0 0 1 2.529 1.736 8.348 8.348 0 0 1 1.735 2.545c.43.97.645 2.006.645 3.108 0 1.102-.21 2.132-.628 3.09a8.32 8.32 0 0 1-1.703 2.53 7.913 7.913 0 0 1-2.529 1.718 7.833 7.833 0 0 1-3.14.629 8.124 8.124 0 0 1-3.107-.596 7.79 7.79 0 0 1-2.546-1.669 7.9 7.9 0 0 1-1.719-2.529C4.21 14.46 4 13.403 4 12.257a7.81 7.81 0 0 1 .612-3.091 7.737 7.737 0 0 1 1.702-2.513 8.438 8.438 0 0 1 2.562-1.719 8.64 8.64 0 0 1 3.157-.71ZM12 7.496a4.74 4.74 0 0 0-1.835.364 4.648 4.648 0 0 0-1.52 1.008c-.43.43-.772.931-1.025 1.504a4.606 4.606 0 0 0-.38 1.885c0 .639.126 1.25.38 1.834a5.063 5.063 0 0 0 1.025 1.538c.43.44.936.788 1.52 1.04.584.254 1.196.38 1.835.38s1.25-.126 1.835-.38c.583-.252 1.09-.6 1.52-1.04.43-.441.772-.954 1.025-1.538.253-.583.38-1.195.38-1.834-.066-1.3-.529-2.397-1.388-3.29-.86-.892-1.973-1.382-3.339-1.47H12Z"
					/>
				</svg>
			),
		},
		{
			title: t('Edara'),
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
				>
					<rect width="24" height="24" fill="#02B8E6" rx="6" />
					<path
						fill="#fff"
						d="M18.873 10.907a3.727 3.727 0 0 0-2.372-1.082 3.95 3.95 0 0 0-1.393-2.098 4.557 4.557 0 0 0-2.864-.994 4.406 4.406 0 0 0-2.43.725 4.234 4.234 0 0 0-1.411 1.535c-.072 0-.143-.006-.214-.006a4.082 4.082 0 0 0-1.62.33 4.197 4.197 0 0 0 1.384 8.035H16.123a.68.68 0 0 0 .09-.006 4.059 4.059 0 0 0 2.633-1.127 3.575 3.575 0 0 0 1.114-2.58c0-1.063-.387-2.039-1.087-2.732Zm-6.589-3.273c1.879 0 3.412 1.48 3.419 3.298a.424.424 0 0 1-.296.4.348.348 0 0 1-.04.016c-.473.151-.968.224-1.466.215a7.098 7.098 0 0 1-1.721-.224.424.424 0 0 1-.31-.518.434.434 0 0 1 .526-.304c1.012.253 1.777.216 2.244.14H14.728a.11.11 0 0 0 .079-.102V10.526c-.218-1.179-1.275-2.034-2.515-2.034-1.418 0-2.568 1.102-2.568 2.456 0 1.354 1.144 2.438 2.56 2.438.281 0 .56-.043.827-.129a2.57 2.57 0 0 0 .868-.479.444.444 0 0 1 .608.037.413.413 0 0 1-.023.584l-.017.015a3.46 3.46 0 0 1-1.14.636l-2.444.945a.16.16 0 0 1-.045.009.446.446 0 0 1-.42-.103.424.424 0 0 1-.13-.3.414.414 0 0 1 .261-.382h.009l.476-.184a3.455 3.455 0 0 1-1.482-1.013 3.261 3.261 0 0 1-.571-.964 3.153 3.153 0 0 1-.203-1.128c-.006-1.818 1.534-3.296 3.426-3.296Zm3.843 8.844h-7.81a3.427 3.427 0 0 1-2.115-.744c-.587-.47-1-1.123-1.173-1.855a3.027 3.027 0 0 1 0-1.486 3.502 3.502 0 0 1 2.69-2.552c.128-.025.26-.041.391-.047a.343.343 0 0 1 .318.138.52.52 0 0 1 .043.553.297.297 0 0 1-.096.102.445.445 0 0 1-.18.066l-.126.022c-.071.012-.14.024-.202.037-1.094.219-1.79 1.131-1.976 1.887-.086.337-.089.69-.007 1.029 0 .01.007.022.01.036a2.51 2.51 0 0 0 2.446 1.924h7.79a2.025 2.025 0 0 0 2.015-2.025c0-1.1-.733-1.947-1.743-2.015a.643.643 0 0 1-.076-.007c-.355-.074-.424-.507-.209-.739.101-.106.165-.149.373-.135.653.042 1.164.303 1.712.86a2.912 2.912 0 0 1-2.07 4.947l-.005.004Z"
					/>
				</svg>
			),
		},
		{
			title: t('Daftra'),
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
				>
					<rect width="24" height="24" fill="#006BFF" rx="6" />
					<path
						fill="#fff"
						d="M10.387 6.224H9.325v3.593h1.114c1.987 0 3.309.47 3.309 2.39v.033c0 1.936-1.32 2.3-3.31 2.3H5.756v3.684h4.564c4.32 0 7.082-2.572 7.082-6.035v-.033c0-3.464-2.729-5.932-7.015-5.932Z"
					/>
				</svg>
			),
		},
		{
			title: t('Wafeq'),
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
				>
					<rect width="24" height="24" fill="#505EDD" rx="6" />
					<path
						fill="#fff"
						fillRule="evenodd"
						d="m13.682 13.091.822-1.81c.214-.477.197-.724-.05-1.25L13.04 7.1a.591.591 0 0 0-.526-.346h-2.137c-.412 0-.708.411-.527.773l2.763 5.695c.263.527.806.461 1.069-.132Zm1.217 4.675c.263.329.657.329.97.033 2.351-2.206 4.095-5.942 4.095-8.773 0-1.942-.872-3.39-2.04-3.39-1.184 0-2.12 1.053-2.12 2.353 0 1.416 1.249 2.206 2.68 1.68.427-.15.608-.067.608.262 0 1.679-2.894 4.197-6.315 5.497-.493.181-.493.807 0 .988 1.053.378 1.58.708 2.122 1.35m-5.016-.642.905-1.992c.246-.527.246-.856-.033-1.399L7.383 7.084a.558.558 0 0 0-.526-.329H4.588a.556.556 0 0 0-.494.806l4.704 9.71c.263.544.806.462 1.085-.147Z"
						clipRule="evenodd"
					/>
				</svg>
			),
		},
		{
			title: t('Qoyod'),
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
				>
					<rect width="24" height="24" fill="#162560" rx="6" />
					<g clipPath="url(#a)">
						<path
							fill="#fff"
							d="M4.475 11.534c0-3.814 2.74-7.31 7.37-7.31 4.628 0 7.35 3.496 7.35 7.31 0 3.814-2.742 7.31-7.35 7.31-4.609 0-7.37-3.496-7.37-7.31Zm11.441 0c0-2.285-1.549-4.41-4.072-4.41-2.522 0-4.072 2.126-4.072 4.41 0 2.284 1.53 4.41 4.072 4.41 2.543 0 4.072-2.126 4.072-4.41Z"
						/>
						<path
							fill="#49D8F7"
							d="M19.64 16.995h-1.458a.886.886 0 0 0-.886.886v1.457c0 .49.397.886.886.886h1.458c.489 0 .885-.397.885-.886v-1.457a.886.886 0 0 0-.885-.886Z"
						/>
					</g>
					<defs>
						<clipPath id="a">
							<path fill="#fff" d="M4.475 4.224h16.05v16H4.476z" />
						</clipPath>
					</defs>
				</svg>
			),
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
	const t = useTranslations('FeaturesInfiniteScroll')

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
			<div className="section space-y-6">
				<p className="mx-auto text-center font-semibold uppercase text-gray-500">
					{t('Replaces')}
				</p>
				<ul className="flex flex-row flex-wrap -items-center justify-center gap-4">
					{Competitors().map((item) => (
						<li
							key={item.title}
							className="flex flex-row items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2 font-medium text-gray-500"
						>
							{item.icon}
							{item.title}
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
