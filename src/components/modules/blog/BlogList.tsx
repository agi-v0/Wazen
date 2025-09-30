import PostPreview from './PostPreview'

interface BlogListProps {
	locale: 'en' | 'ar'
	posts: Sanity.BlogPost[]
	emptyMessage?: string
}

export default function BlogList({
	locale,
	posts,
	emptyMessage,
}: BlogListProps) {
	// Default empty messages
	const defaultEmptyMessage =
		emptyMessage ||
		(locale === 'en' ? 'No blog posts found.' : 'لم يتم العثور على مقالات.')

	if (!posts || posts.length === 0) {
		return (
			<section className="bg-white" id="blog-posts">
				<div className="section fluid-gap flex flex-col items-center py-(--size--4rem)">
					<p className="text-center text-gray-600">{defaultEmptyMessage}</p>
				</div>
			</section>
		)
	}

	return (
		<section className="bg-gray-50" id="blog-posts">
			<div className="section fluid-gap flex flex-col items-center py-(--size--4rem)">
				<ul className="grid w-full gap-6 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
					{posts.map((post, key) => (
						<li key={`${post.metadata?.slug?.current}-${key}`}>
							<PostPreview type="categories-list" post={post} locale={locale} />
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
