'use client'

import { useState } from 'react'
import { fetchSanity } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import PostPreview from './PostPreview'
import { cn } from '@/lib/utils'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis,
} from '@/components/ui/pagination'

const POSTS_PER_PAGE = 9

interface BlogListProps {
	locale: 'en' | 'ar'
	initialPosts: Sanity.BlogPost[]
	totalCount: number
	categoryRef?: string
}

export default function BlogList({
	locale,
	initialPosts,
	totalCount,
	categoryRef,
}: BlogListProps) {
	const [posts, setPosts] = useState(initialPosts)
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE)

	// Determine post type based on locale
	const type = locale === 'en' ? 'blog.post.en' : 'blog.post'

	const fetchPosts = async (page: number) => {
		setLoading(true)
		try {
			const offset = (page - 1) * POSTS_PER_PAGE
			const limit = offset + POSTS_PER_PAGE

			const query = categoryRef
				? groq`*[_type == $type && $categoryRef in categories[]->_id] | order(publishDate desc) [$offset...$limit] {
					title,
					publishDate,
					metadata,
					body,
					categories[]->{
						title
					}
				}`
				: groq`*[_type == $type] | order(publishDate desc) [$offset...$limit] {
					title,
					publishDate,
					metadata,
					body,
					categories[]->{
						title
					}
				}`

			const newPosts = await fetchSanity({
				query,
				params: {
					type,
					categoryRef,
					offset,
					limit,
				},
			})

			setPosts(newPosts)
		} catch (error) {
			console.error('Failed to fetch posts:', error)
		} finally {
			setLoading(false)
		}
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		fetchPosts(page)
		// Scroll to top of the blog list
		document.getElementById('blog-posts')?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
	}

	const renderPaginationItems = () => {
		const items = []
		const maxVisiblePages = 5
		const halfVisible = Math.floor(maxVisiblePages / 2)

		let startPage = Math.max(1, currentPage - halfVisible)
		let endPage = Math.min(totalPages, currentPage + halfVisible)

		// Adjust if we're near the beginning or end
		if (currentPage <= halfVisible) {
			endPage = Math.min(totalPages, maxVisiblePages)
		}
		if (currentPage > totalPages - halfVisible) {
			startPage = Math.max(1, totalPages - maxVisiblePages + 1)
		}

		// Add first page and ellipsis if needed
		if (startPage > 1) {
			items.push(
				<PaginationItem key="1">
					<PaginationLink
						href="#"
						onClick={(e) => {
							e.preventDefault()
							handlePageChange(1)
						}}
						isActive={currentPage === 1}
					>
						1
					</PaginationLink>
				</PaginationItem>,
			)
			if (startPage > 2) {
				items.push(
					<PaginationItem key="ellipsis-1">
						<PaginationEllipsis />
					</PaginationItem>,
				)
			}
		}

		// Add visible page numbers
		for (let i = startPage; i <= endPage; i++) {
			items.push(
				<PaginationItem key={i}>
					<PaginationLink
						href="#"
						onClick={(e) => {
							e.preventDefault()
							handlePageChange(i)
						}}
						isActive={currentPage === i}
					>
						{i}
					</PaginationLink>
				</PaginationItem>,
			)
		}

		// Add last page and ellipsis if needed
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				items.push(
					<PaginationItem key="ellipsis-2">
						<PaginationEllipsis />
					</PaginationItem>,
				)
			}
			items.push(
				<PaginationItem key={totalPages}>
					<PaginationLink
						href="#"
						onClick={(e) => {
							e.preventDefault()
							handlePageChange(totalPages)
						}}
						isActive={currentPage === totalPages}
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>,
			)
		}

		return items
	}

	if (!posts || posts.length === 0) {
		return (
			<section className="bg-white" id="blog-posts">
				<div className="section fluid-gap flex flex-col items-center py-(--size--4rem)">
					<p className="text-center text-gray-600">
						{locale === 'en'
							? 'No blog posts found.'
							: 'لم يتم العثور على مقالات.'}
					</p>
				</div>
			</section>
		)
	}

	return (
		<section className="bg-gray-50" id="blog-posts">
			<div className="section fluid-gap flex flex-col items-center py-(--size--4rem)">
				{/* <div className="mb-8">
					<h2 className="h3 text-center font-semibold text-cyan-950">
						{locale === 'en' ? 'All Blog Posts' : 'جميع المقالات'}
					</h2>
					<p className="mt-2 text-center text-gray-600">
						{locale === 'en'
							? `${totalCount} posts available`
							: `${totalCount} مقال متاح`}
					</p>
				</div> */}

				{loading && (
					<div className="flex items-center justify-center py-8">
						<div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-teal-600"></div>
					</div>
				)}

				<ul
					className={cn(
						'grid w-full gap-6 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
						loading && 'opacity-50',
					)}
				>
					{posts.map((post, key) => (
						<li key={`${post.metadata?.slug?.current}-${key}`}>
							<PostPreview type="categories-list" post={post} locale={locale} />
						</li>
					))}
				</ul>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="mt-8">
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										href="#"
										onClick={(e) => {
											e.preventDefault()
											if (currentPage > 1) {
												handlePageChange(currentPage - 1)
											}
										}}
										className={
											currentPage === 1 ? 'pointer-events-none opacity-50' : ''
										}
									/>
								</PaginationItem>

								{renderPaginationItems()}

								<PaginationItem>
									<PaginationNext
										href="#"
										onClick={(e) => {
											e.preventDefault()
											if (currentPage < totalPages) {
												handlePageChange(currentPage + 1)
											}
										}}
										className={
											currentPage === totalPages
												? 'pointer-events-none opacity-50'
												: ''
										}
									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				)}
			</div>
		</section>
	)
}
