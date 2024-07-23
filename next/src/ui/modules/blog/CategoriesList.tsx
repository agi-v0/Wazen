import Link from 'next/link'

export default function Categories({
	categories,
	locale,
}: {
	categories?: Sanity.BlogCategory[]
	locale: any
}) {
	if (!categories?.length) return null
	return (
		<ul className="my-4 flex justify-center">
			{categories?.map((category, key) => (
				<li
					className="cursor-pointer px-4 py-2 hover:bg-gray-500/5 hover:text-teal-600"
					key={key}
				>
					<Link href={`/blog/${category.title}`}>
						{locale == 'ar' ? category.title : category.title_en}
					</Link>
				</li>
			))}
		</ul>
	)
}
