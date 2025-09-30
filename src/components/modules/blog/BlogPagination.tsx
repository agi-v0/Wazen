'use client'

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis,
} from '@/components/ui/pagination'
import { useRouter } from 'next/navigation'

interface BlogPaginationProps {
	locale: 'en' | 'ar'
	currentPage: number
	totalPages: number
	categorySlug?: string
}

export default function BlogPagination({
	locale,
	currentPage,
	totalPages,
	categorySlug,
}: BlogPaginationProps) {
	const router = useRouter()

	// Early return if invalid props
	if (!locale || !currentPage || !totalPages || totalPages <= 1) {
		return null
	}

	const getPageUrl = (page: number) => {
		const basePath = categorySlug
			? `/blog/category/${encodeURIComponent(categorySlug)}`
			: `/blog`
		return page === 1 ? basePath : `${basePath}/page/${page}`
	}

	const handlePageChange = (page: number) => {
		router.push(getPageUrl(page))
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
						onClick={() => handlePageChange(1)}
						isActive={currentPage === 1}
						className="cursor-pointer"
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
						onClick={() => handlePageChange(i)}
						isActive={currentPage === i}
						className="cursor-pointer"
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
						onClick={() => handlePageChange(totalPages)}
						isActive={currentPage === totalPages}
						className="cursor-pointer"
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>,
			)
		}

		return items
	}

	if (totalPages <= 1) {
		return null
	}

	return (
		<div className="mt-8">
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => {
								if (currentPage > 1) {
									handlePageChange(currentPage - 1)
								}
							}}
							className={`cursor-pointer ${
								currentPage === 1 ? 'pointer-events-none opacity-50' : ''
							}`}
						/>
					</PaginationItem>

					{renderPaginationItems()}

					<PaginationItem>
						<PaginationNext
							onClick={() => {
								if (currentPage < totalPages) {
									handlePageChange(currentPage + 1)
								}
							}}
							className={`cursor-pointer ${
								currentPage === totalPages
									? 'pointer-events-none opacity-50'
									: ''
							}`}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}
