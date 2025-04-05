'use client'

import { fetchSanity, groq } from '@/sanity/lib/fetch'
import PostPreview from './PostPreview'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify-icon/react'
import { useState } from 'react'

const BATCH_SIZE = 9 // Define the number of posts to fetch per batch

export default function RollupClient({
	_type,
	_id,
	title,
	categoryRef,
	initialPosts,
	locale,
}: Partial<{
	_type: string
	_id: string
	title: string
	categoryRef: any
	initialPosts: Sanity.BlogPost[]
	locale: 'en' | 'ar'
}>) {
	const [posts, setPosts] = useState(initialPosts || [])
	const [loading, setLoading] = useState(false)
	const [start, setStart] = useState(initialPosts?.length || 0) // Initialize start properly
	const [hasMore, setHasMore] = useState(true) // State to track if more posts are available
	const [error, setError] = useState<string | null>(null) // State for error handling

	// Determine post type based on _type and locale
	const type = (() => {
		const isBlogPost = _type === 'categories-list'
		const baseType = isBlogPost ? 'blog.post' : 'help.center.post'
		return locale === 'en' ? `${baseType}.en` : baseType
	})()

	const loadMore = async () => {
		setLoading(true)
		setError(null) // Reset error on new attempt

		try {
			const newPosts = await fetchSanity<Sanity.BlogPost[]>(
				// Use BATCH_SIZE in the query slice
				{
					query: groq`*[_type == $type && $categoryRef in categories[]->_id]|order(publishDate desc)[$start...($start + ${BATCH_SIZE})]{
				 	title,
					publishDate,
					metadata,
					body,
				 categories[]->{
					title,
					title_en
				 }
				}`,

					params: {
						type: type,
						categoryRef: categoryRef,
						start: start,
					},
					tags: ['posts'],
				},
			)

			if (newPosts && newPosts.length > 0) {
				// Append new posts to the existing posts
				setPosts((prevPosts) => [...prevPosts, ...newPosts])

				// Update the start index for the next batch
				setStart((prevStart) => prevStart + newPosts.length)

				// Check if there are likely more posts
				if (newPosts.length < BATCH_SIZE) {
					setHasMore(false)
				}
			} else {
				// No new posts returned, assume no more are available
				setHasMore(false)
			}
		} catch (err) {
			console.error('Failed to load more posts:', err)
			setError(
				locale === 'en'
					? 'Failed to load more posts.'
					: 'فشل تحميل المزيد من المشاركات.',
			)
			// Optionally keep hasMore as true to allow retrying?
			// setHasMore(false); // Or set to false on error?
		} finally {
			setLoading(false) // Ensure loading is set to false in both success and error cases
		}
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

				{/* Display error message if any */}
				{error && <p className="text-sm text-red-600">{error}</p>}

				{/* Only show button if there are more posts to load */}
				{hasMore && (
					<button
						className="group flex flex-row items-center justify-center rounded-lg px-6 py-3 font-medium text-cyan-950/80 no-underline hover:bg-white/80 hover:text-cyan-950 disabled:cursor-not-allowed disabled:opacity-60 data-[loading=true]:bg-transparent"
						onClick={loadMore}
						// Disable button when loading or when no more posts
						disabled={loading || !hasMore}
						data-loading={loading}
					>
						{locale == 'en' ? 'See more' : 'إظهار المزيد'}

						{/* Loading spinner */}
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

						{/* Arrow icon */}
						<Icon
							icon="ph:caret-right-bold"
							className="size-3 translate-x-0 text-cyan-950/60 opacity-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100 data-[loading=false]:block data-[loading=true]:hidden rtl:rotate-180 rtl:group-hover:-translate-x-1"
							data-loading={loading}
						/>
					</button>
				)}
			</div>
		</section>
	)
}
