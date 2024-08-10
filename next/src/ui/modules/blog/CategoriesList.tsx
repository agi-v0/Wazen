import Link from 'next/link'
import { stegaClean } from '@sanity/client/stega'

export default function Categories({
	categories,
	locale,
}: {
	categories?: Sanity.BlogCategory[]
	locale: any
}) {
	if (!categories?.length) return null
	return (
		<ul className="section my-[var(--size--2rem)] flex justify-center">
			{categories?.map((category, key) => (
				<li
					className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md px-6 py-3 font-medium text-cyan-950/80 hover:bg-teal-50 hover:text-cyan-700"
					key={key}
				>
					<Link
						href={decodeURIComponent(`/blog#${stegaClean(category.title)}`)}
					>
						{locale == 'ar' ? category.title : category.title_en}
					</Link>
				</li>
			))}
		</ul>
	)
}
