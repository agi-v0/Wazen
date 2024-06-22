import Link from 'next/link'

export default function Categories({
	categories,
}: {
	categories?: Sanity.BlogCategory[]
}) {
	if (!categories?.length) return null
	console.log(categories)
	return (
		<ul className="my-4 flex justify-center">
			{categories?.map((category, key) => (
				<li
					className="cursor-pointer px-4 py-2 hover:bg-gray-500/5 hover:text-teal-600"
					key={key}
				>
					<Link href={`/blog/${category.title}`}>{category.title}</Link>
				</li>
			))}
		</ul>
	)
}
