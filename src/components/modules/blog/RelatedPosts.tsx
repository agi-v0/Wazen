import PostPreview from './PostPreview'

interface RelatedPosts {
	locale: 'en' | 'ar'
	posts: Sanity.BlogPost[]
	emptyMessage?: string
	className?: string
}

export default function RelatedPosts({
	locale,
	posts,
	className,
}: RelatedPosts) {
	if (!posts || posts.length === 0) {
		return null
	}

	return (
		<section className={className} id="blog-posts">
			<div className="flex flex-col gap-4">
				<h3 className="text-large font-semibold text-cyan-950">
					{locale === 'ar' ? 'قد يهمك ايضا' : 'Related Posts'}
				</h3>
				<hr />
				<ul className="flex w-full flex-col divide-y">
					{posts.map((post, key) => (
						<li key={`${post.metadata?.slug?.current}-${key}`}>
							<PostPreview
								type="categories-list"
								post={post}
								locale={locale}
								className="px-0 lg:pe-6"
							/>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
