'use client'
import { Link } from '@/i18n/routing'
import { slugify } from '@/lib/slugify'
import { useRouter } from 'next/navigation'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export default function Categories({
	_type,
	categories,
	locale,
	slug,
}: {
	_type: string
	categories?: Sanity.BlogCategory[]
	locale: any
	slug?: string
}) {
	const pageType = _type == 'categories-list' ? 'blog' : 'help-center'
	const router = useRouter()

	if (!categories?.length) return null

	const handleSelectChange = (value: string) => {
		if (value === 'all') {
			router.push(`/${locale}/${pageType}`)
		} else {
			router.push(
				`/${locale}/${pageType}/category/${encodeURIComponent(value)}`,
			)
		}
	}

	const getCurrentValue = () => {
		if (!slug || slug === 'all') return 'all'
		return decodeURIComponent(slug)
	}

	const getCurrentLabel = () => {
		if (!slug || slug === 'all') {
			return locale === 'ar' ? 'الكل' : 'All'
		}

		const currentCategory = categories?.find((category) => {
			const categorySlug = slugify(
				locale === 'ar' ? category.title.ar : category.title.en,
			)
			return slug === categorySlug || decodeURIComponent(slug) === categorySlug
		})

		return currentCategory
			? locale === 'ar'
				? currentCategory.title.ar
				: currentCategory.title.en
			: locale === 'ar'
				? 'الكل'
				: 'All'
	}

	return (
		<div className="sticky top-(--header-height) mt-(--size--2rem) w-full bg-white shadow-xs">
			<div className="section mx-auto flex flex-row items-center justify-between gap-2 md:pt-2">
				<div className="flex justify-start">
					<div className="text-sm font-medium text-gray-500">
						{locale === 'ar' ? 'التصنيف:' : 'Category:'}
					</div>
				</div>

				{/* Mobile Select - visible only on mobile */}
				<div className="block flex-1 py-(--padding-horizontal--main) md:hidden">
					<Select
						dir={locale === 'ar' ? 'rtl' : 'ltr'}
						value={getCurrentValue()}
						onValueChange={handleSelectChange}
					>
						<SelectTrigger className="w-full" size="lg">
							<SelectValue placeholder={getCurrentLabel()} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">
								{locale === 'ar' ? 'الكل' : 'All'}
							</SelectItem>
							{categories?.map((category, _key) => {
								const categorySlug = slugify(
									locale === 'ar' ? category.title.ar : category.title.en,
								)
								return (
									<SelectItem key={_key} value={categorySlug}>
										{locale === 'ar' ? category.title.ar : category.title.en}
									</SelectItem>
								)
							})}
						</SelectContent>
					</Select>
				</div>

				{/* Desktop Navigation - hidden on mobile */}
				<nav className="hide-scrollbar -border-b hidden overflow-x-auto border-gray-200 md:flex">
					<Link
						key={'all'}
						href={`/${pageType}`}
						className={`border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
							!slug || slug === 'all'
								? 'border-teal-500 text-teal-600'
								: 'border-transparent text-gray-500 hover:border-teal-600 hover:text-teal-600'
						}`}
					>
						{locale == 'ar' ? 'الكل' : 'All'}
					</Link>
					{categories?.map((category, _key) => {
						const categorySlug = category.slug?.current || ''
						const isActive =
							slug &&
							(slug === categorySlug ||
								decodeURIComponent(slug) === categorySlug)

						return (
							<Link
								key={_key}
								href={`/${pageType}/category/${encodeURIComponent(categorySlug)}`}
								className={`border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 last:pe-0 ${
									isActive
										? 'border-teal-500 text-teal-600'
										: 'border-transparent text-gray-500 hover:border-teal-300 hover:text-teal-600'
								}`}
							>
								{locale == 'ar' ? category.title.ar : category.title.en}
							</Link>
						)
					})}
				</nav>
			</div>
		</div>
	)
}
