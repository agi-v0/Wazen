'use client'
import { useState } from 'react'
import Toggle from './Toggle'
import Logo from '@/components/ui/logo'
import Button from '../../LinkButton'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import processUrl from '@/lib/processUrl'
import { Icon } from '@iconify-icon/react'
import { cn } from '@/lib/utils'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import MobileLangSelect from './MobileLangSelect'

const LangSelect = dynamic(() => import('../LangSelect'))

interface MobileNavProps {
	locale: 'en' | 'ar'
	headerMenu?: Sanity.Navigation
	ctas?: Sanity.CTA[]
}

// Mobile-optimized version of the navigation menu trigger style
const mobileNavLinkStyle = cn(
	navigationMenuTriggerStyle(),
	// Mobile-specific adjustments
	'h-12 text-base font-medium rounded-lg px-4 py-3',
	// Remove desktop-specific styles and add mobile touch targets
	'touch-manipulation min-h-[44px]',
)

const mobileAccordionHeaderStyle = cn(
	navigationMenuTriggerStyle(),
	// Mobile-specific adjustments for accordion headers
	'h-12 text-base font-medium rounded-lg px-4 py-3 justify-between',
	'touch-manipulation min-h-[44px]',
)

const mobileSubLinkStyle = cn(
	// Similar base styling but smaller and indented
	'group relative inline-flex items-center justify-start rounded-lg bg-white px-4 py-3',
	'text-sm font-medium transition-colors hover:bg-teal-50 text-cyan-950/80 hover:text-cyan-700',
	'focus:bg-teal-50 focus:text-cyan-700 focus:outline-none touch-manipulation min-h-[40px]',
)

const mobileFeaturedLinkStyle = cn(
	// Featured item styling adapted for mobile
	'group relative flex flex-col justify-end rounded-lg bg-gradient-to-b from-cyan-800 to-cyan-950 p-4',
	'text-start no-underline outline-none transition-all focus:shadow-md touch-manipulation min-h-[120px]',
)

export default function MobileNav({
	locale,
	headerMenu,
	ctas,
}: MobileNavProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [expandedItems, setExpandedItems] = useState<string[]>([])

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
		// Reset expanded items when closing menu
		if (isMenuOpen) {
			setExpandedItems([])
		}
	}

	const toggleExpanded = (itemKey: string) => {
		setExpandedItems((prev) =>
			prev.includes(itemKey)
				? prev.filter((key) => key !== itemKey)
				: [...prev, itemKey],
		)
	}

	return (
		<div className="lg:hidden">
			{/* Mobile Header Bar - Always Visible */}
			<div className="section mx-auto flex w-full flex-row items-center justify-between py-3">
				<Link
					className="flex h-10 items-center justify-center"
					href="/"
					aria-label={locale == 'en' ? 'Homepage' : 'الصفحة الرئيسية'}
				>
					<Logo className="h-5" locale={locale} />
				</Link>
				<Toggle isOpen={isMenuOpen} onToggle={toggleMenu} />
			</div>

			{/* Mobile Menu Overlay - Controlled by React state */}
			{isMenuOpen && (
				<div className="fixed inset-0 z-40 bg-white">
					<div className="flex h-full flex-col">
						{/* Mobile Menu Header */}
						<div className="section mx-auto flex w-full flex-row items-center justify-between py-3">
							<Link
								className="flex h-10 items-center justify-center"
								href="/"
								aria-label={locale == 'en' ? 'Homepage' : 'الصفحة الرئيسية'}
								onClick={() => setIsMenuOpen(false)} // Close menu when logo is clicked
							>
								<Logo className="h-5" locale={locale} />
							</Link>
							<Toggle isOpen={isMenuOpen} onToggle={toggleMenu} />
						</div>

						{/* Mobile Navigation Links */}
						<div className="flex-1 overflow-y-auto">
							<div className="section mx-auto py-4">
								<nav className="space-y-2">
									{headerMenu?.items?.map((item, key) => {
										const itemKey = `item-${key}`
										const isExpanded = expandedItems.includes(itemKey)

										switch (item._type) {
											case 'link':
												return (
													<div key={key}>
														{item.internal && (
															<Link
																locale={locale as 'en' | 'ar'}
																href={processUrl(item.internal, {
																	base: false,
																	params: item.params,
																})}
																className={mobileNavLinkStyle}
																onClick={() => setIsMenuOpen(false)} // Close menu when link is clicked
															>
																{item.label || item.internal.title}
															</Link>
														)}
													</div>
												)

											case 'link.list':
												return (
													<div key={key} className="overflow-hidden rounded-lg">
														{/* Accordion Header */}
														<button
															onClick={() => toggleExpanded(itemKey)}
															className={mobileAccordionHeaderStyle}
														>
															<span>{item.label}</span>
															<Icon
																icon="ph:caret-down-bold"
																className={cn(
																	'text-gray-400 transition-transform duration-200',
																	isExpanded && 'rotate-180',
																)}
															/>
														</button>

														{/* Accordion Content */}
														{isExpanded && item.links && (
															<div className="flex flex-col gap-1 bg-gray-50/30">
																{/* Featured First Item */}
																{item.links[0] && (
																	<Link
																		locale={locale as 'en' | 'ar'}
																		href={processUrl(item.links[0].internal, {
																			base: false,
																			params: item.links[0].params,
																		})}
																		className={mobileFeaturedLinkStyle}
																		onClick={() => setIsMenuOpen(false)}
																	>
																		<img
																			src="https://cdn.sanity.io/images/m7bjawr3/production/4d0c0529d981a468765adb5a1f3f3a896befe909-1440x1024.svg?w=540&fm=webp"
																			alt={item.links[0].label}
																			className="mb-3 h-auto w-full rounded-md"
																			draggable={false}
																			loading="lazy"
																			width={540}
																		/>
																		<div className="flex flex-row items-center text-sm font-medium text-white group-hover:text-teal-200">
																			{item.links[0].label}
																			<Icon
																				icon="ph:caret-left-bold"
																				className="ml-1 size-3 text-white/50 opacity-0 transition-transform group-hover:-translate-x-1 group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1"
																			/>
																		</div>
																		{item.links[0].description && (
																			<p className="mt-1 text-xs leading-tight text-white/80 group-hover:text-white">
																				{item.links[0].description}
																			</p>
																		)}
																	</Link>
																)}

																{/* Remaining Items */}
																{item.links
																	.slice(1)
																	.map((link: any, linkKey: number) => (
																		<Link
																			key={linkKey}
																			locale={locale as 'en' | 'ar'}
																			href={processUrl(link.internal, {
																				base: false,
																				params: link.params,
																			})}
																			className={cn(
																				mobileSubLinkStyle,
																				'flex-col items-start',
																			)}
																			onClick={() => setIsMenuOpen(false)} // Close menu when link is clicked
																		>
																			<span className="font-medium">
																				{link.label}
																			</span>
																			{link.description && (
																				<span className="mt-1 text-xs font-normal text-gray-500">
																					{link.description}
																				</span>
																			)}
																		</Link>
																	))}
															</div>
														)}
													</div>
												)

											case 'link.group':
												return (
													<div key={key} className="overflow-hidden rounded-lg">
														{/* Accordion Header */}
														<button
															onClick={() => toggleExpanded(itemKey)}
															className={mobileAccordionHeaderStyle}
														>
															<span>{item.label}</span>
															<Icon
																icon="ph:caret-down-bold"
																className={cn(
																	'text-gray-400 transition-transform duration-200',
																	isExpanded && 'rotate-180',
																)}
															/>
														</button>

														{/* Accordion Content */}
														{isExpanded && item.links?.[0]?.links && (
															<div className="flex flex-col bg-gray-50/30">
																{item.links[0].links.map(
																	(link: any, linkKey: number) => (
																		<Link
																			key={linkKey}
																			locale={locale as 'en' | 'ar'}
																			href={
																				link.type === 'internal'
																					? processUrl(link.internal, {
																							base: false,
																							params: link.params,
																						})
																					: link.external
																			}
																			className={cn(
																				mobileSubLinkStyle,
																				'px-3 py-2',
																			)}
																			onClick={() => setIsMenuOpen(false)} // Close menu when link is clicked
																		>
																			{link.iconify?.name && (
																				<div className="me-2 size-8 flex-none rounded-md bg-teal-50 p-1 transition-colors duration-200 group-hover:bg-cyan-800">
																					<Icon
																						icon={link.iconify.name}
																						className="h-6 text-2xl text-teal-600 transition-colors group-hover:text-teal-50"
																					/>
																				</div>
																			)}
																			<span className="font-medium">
																				{link.label || link.internal?.title}
																			</span>
																		</Link>
																	),
																)}
															</div>
														)}
													</div>
												)

											default:
												return null
										}
									})}
								</nav>
							</div>
						</div>

						{/* Mobile Footer Actions */}
						<div className="border-t border-gray-100">
							<div className="section mx-auto py-2">
								<div className="space-y-1">
									<MobileLangSelect />
									{ctas?.map((cta, key) => (
										<div key={key} className="w-full">
											<Button
												{...cta}
												className="h-12 w-full justify-center py-3 text-base font-medium"
											/>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
