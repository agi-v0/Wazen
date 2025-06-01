import Link from 'next/link'
import Rollup from './Rollup'

export default function Categories({
	_type,
	categories,
	locale,
}: {
	_type: string
	categories?: Sanity.BlogCategory[]
	locale: any
}) {
	const pageType = _type == 'categories-list' ? 'blog' : 'help-center'

	if (!categories?.length) return null
	return (
		<>
			<ul className="section mx-auto my-[var(--size--2rem)] flex w-full flex-row flex-wrap justify-evenly overflow-x-scroll lg:justify-center">
				{categories?.map((category, _key) => (
					<li
						className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-md px-6 py-3 font-medium text-cyan-950/80 hover:bg-teal-50 hover:text-cyan-700"
						key={_key}
					>
						<Link href={decodeURIComponent(`/${pageType}#${category.title}`)}>
							{locale == 'ar' ? category.title : category.title_en}
						</Link>
					</li>
				))}
			</ul>
			{categories.map((category, _key) => {
				return (
					<Rollup
						_type={_type}
						title={locale == 'ar' ? category.title : category.title_en}
						categoryRef={category._id}
						key={'rollup' + _key}
						layout="grid"
						locale={locale}
					/>
				)
			})}
		</>
	)
}
