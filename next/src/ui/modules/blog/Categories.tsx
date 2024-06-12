import Link from 'next/link'

export default function Categories({
	links,
}: {
	links?: Sanity.LinkList[]
}) {
	if (!links?.length) return null

	return (
		<ul className='flex justify-center my-4'>
			{links?.map((category, key) => (
				<li
					className="cursor-pointer px-4 py-2 hover:bg-gray-500/5 hover:text-teal-600"
					key={key}
				>
					<Link href={`/blog/${category.label}`}>{category.label}</Link>
				</li>
			))}
		</ul>
	)
}
