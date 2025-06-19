import { fetchSanity, fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import processMetadata from '@/lib/processMetadata'
import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { slugify } from '@/lib/slugify'

type Props = {
	params: Promise<{ locale: 'en' | 'ar' }>
}

export default async function CategoriesPage({ params }: Props) {
	const resolvedParams = await params
	setRequestLocale(resolvedParams.locale)

	const [categories, categoryCounts] = await Promise.all([
		getCategories(),
		getCategoryCounts(resolvedParams.locale),
	])

	return (
		<div className="bg-white">
			<div className="section py-(--size--4rem)">
				<div className="mb-12 text-center">
					<h1 className="mb-4 text-4xl font-bold">
						{resolvedParams.locale === 'en'
							? 'Blog Categories'
							: 'تصنيفات المدونة'}
					</h1>
					<p className="mx-auto max-w-2xl text-gray-600">
						{resolvedParams.locale === 'en'
							? 'Explore our blog posts organized by categories. Find content that interests you most.'
							: 'استكشف مقالات مدونتنا مُنظمة حسب التصنيفات. اعثر على المحتوى الذي يهمك أكثر.'}
					</p>
				</div>

				<div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
					{categories.map((category: any) => {
						const title =
							resolvedParams.locale === 'en'
								? category.title?.en || category.title
								: category.title?.ar || category.title

						const postCount = categoryCounts[category._id] || 0

						return (
							<Link
								key={category._id}
								href={`/${resolvedParams.locale}/blog/category/${encodeURIComponent(slugify(resolvedParams.locale === 'ar' ? category.title.ar : category.title.en))}`}
								className="group block rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-md"
							>
								<div className="text-center">
									<h3 className="mb-3 text-xl font-semibold transition-colors group-hover:text-blue-600">
										{title}
									</h3>
									<p className="text-sm text-gray-600">
										{resolvedParams.locale === 'en'
											? `${postCount} ${postCount === 1 ? 'post' : 'posts'}`
											: `${postCount} ${postCount === 1 ? 'مقال' : 'مقالات'}`}
									</p>
								</div>
							</Link>
						)
					})}
				</div>

				{categories.length === 0 && (
					<div className="py-12 text-center">
						<p className="text-gray-600">
							{resolvedParams.locale === 'en'
								? 'No categories found.'
								: 'لم يتم العثور على تصنيفات.'}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export async function generateMetadata({ params }: Props) {
	const resolvedParams = await params

	return {
		title:
			resolvedParams.locale === 'en' ? 'Blog Categories' : 'تصنيفات المدونة',
		description:
			resolvedParams.locale === 'en'
				? 'Browse all blog categories and find content that interests you.'
				: 'تصفح جميع تصنيفات المدونة واعثر على المحتوى الذي يهمك.',
	}
}

async function getCategories() {
	return await fetchSanityLive({
		query: groq`*[_type == 'blog.category'] | order(title.en asc) {
			_id,
			title,
			slug
		}`,
		params: {},
		tags: ['blog-category'],
	})
}

async function getCategoryCounts(locale: 'en' | 'ar') {
	const type = locale === 'en' ? 'blog.post.en' : 'blog.post'

	const counts = await fetchSanityLive({
		query: groq`*[_type == 'blog.category'] {
			"categoryId": _id,
			"count": count(*[_type == $type && ^._id in categories[]->_id])
		}`,
		params: { type },
		tags: ['blog'],
	})

	// Convert to object for easy lookup
	return counts.reduce((acc: any, item: any) => {
		acc[item.categoryId] = item.count
		return acc
	}, {})
}
