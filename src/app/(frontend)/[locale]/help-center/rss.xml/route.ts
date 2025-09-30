import RSS from 'rss'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import processUrl from '@/lib/processUrl'

export async function GET() {
	const { helpCenter, posts } = await fetchSanityLive({
		query: groq`{
			'helpCenter': *[_type == 'page' && metadata.slug.current == 'help-center'][0]{
				_type,
				title,
				metadata
			},
			'posts': *[_type == 'help.center.post']{
				_type,
				title,
				publishDate,
				metadata
			}
		}`,
		tags: ['help-center'],
	})

	const url = processUrl(helpCenter)

	const feed = new RSS({
		title: `${helpCenter.title}`,
		site_url: url,
		feed_url: `${url}/rss.xml`,
		language: 'en',
	})

	posts.map((post: Sanity.HelpCenterPost) =>
		feed.item({
			title: post.title ?? '',
			url: processUrl(post),
			date: post.publishDate,
			description: post.metadata.description,
		}),
	)

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/atom+xml',
		},
	})
}
