'use client'

import { fetchSanity, groq } from '@/sanity/lib/fetch'
import PostPreview from './PostPreview'
import { cn } from '@/lib/utils'
import { PiCaretRightBold } from '@/components/ui/Icons'
import { useState } from 'react'

export default function RollupClient({
	_type,
	_id,
	title,
	limit,
	categoryRef,
	initialPosts,
	locale,
}: Partial<{
	_type: string
	_id: string
	title: string
	limit: number
	categoryRef: any
	initialPosts: Sanity.BlogPost[]
	locale: 'en' | 'ar'
}>) {
	const [posts, setPosts] = useState(initialPosts || [])
	const [loading, setLoading] = useState(false)
	const [start, setStart] = useState(initialPosts?.length) // Starting point for fetching more posts

	const type =
		// 'help-center-categories-list'
		_type === 'categories-list'
			? locale === 'ar'
				? 'blog.post'
				: 'blog.post.en'
			: locale === 'ar'
				? 'help.center.post'
				: 'help.center.post.en'

	const loadMore = async () => {
		setLoading(true)

		// GROQ query to fetch the next 3 blog posts (dynamically from the client)
		const newPosts = await fetchSanity<Sanity.BlogPost[]>(
			groq`*[_type == $type && $categoryRef in categories[]->_id]|order(publishDate desc)[$start...($start+9)]{
			 	title,
				publishDate,
				metadata,
				body,
			 categories[]->{
				title,
				title_en
			 }
			}`,
			{
				params: {
					type: type,
					categoryRef: categoryRef,
					start: start,
				},
				tags: ['posts'],
			},
		)

		// Append new posts to the existing posts
		setPosts((posts) => [...posts, ...newPosts])

		// Update the start index to fetch the next batch
		setStart((prevStart = 3) => prevStart + newPosts.length)
		setLoading(false)
	}

	return (
		<section className="bg-teal-50" id={title}>
			<div className="section fluid-gap flex flex-col items-center bg-teal-50 py-[var(--size--4rem)]">
				{title && (
					<h2 className="h3 text-center font-semibold text-cyan-950">
						{title}
					</h2>
				)}
				<ul
					className={cn(
						'grid w-full gap-6 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
					)}
				>
					{posts?.map((post, key) => {
						return (
							<li key={key}>
								{<PostPreview type={_type} post={post} locale={locale} />}
							</li>
						)
					})}
				</ul>
				<button
					className="group flex flex-row items-center justify-center rounded-lg px-6 py-3 font-medium text-cyan-950/80 no-underline hover:bg-white/80 hover:text-cyan-950 data-[loading=true]:bg-transparent"
					onClick={loadMore}
					disabled={loading}
					data-loading={loading}
				>
					{locale == 'en' ? 'See more' : 'إظهار المزيد'}

					<svg
						data-loading={loading}
						className="ms-2 h-5 w-5 animate-spin text-cyan-950 data-[loading=false]:hidden"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="2"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>

					<PiCaretRightBold
						className="size-3 translate-x-0 text-cyan-950/60 opacity-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100 data-[loading=false]:block data-[loading=true]:hidden rtl:rotate-180 rtl:group-hover:-translate-x-1"
						data-loading={loading}
					/>
				</button>
			</div>
		</section>
	)
}
