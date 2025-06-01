import { fetchSanity } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import Post from '@/components/ui/modules/blog/Post'
import processMetadata from '@/lib/processMetadata'
import { setRequestLocale } from 'next-intl/server'

type Props = {
	params: Promise<{ slug?: string; locale: 'en' | 'ar' }>
}

export default async function Page({ params }: Props) {
	const resolvedParams = await params
	setRequestLocale(resolvedParams.locale)
	const post = await getPost(await params)
	if (!post) notFound()
	return <Post post={post} locale={resolvedParams.locale} />
}

export async function generateMetadata({ params }: Props) {
	const resolvedParams = await params
	setRequestLocale(resolvedParams.locale)
	const post = await getPost(await params)
	if (!post) notFound()
	return processMetadata(post, resolvedParams.locale)
}

export async function generateStaticParams() {
	const slugs = await fetchSanity<string[]>({
		query: groq`*[_type == 'blog.post' && defined(metadata.slug.current)].metadata.slug.current`,
	})
	return slugs.flatMap((slug) => [
		{ slug, locale: 'ar' },
		{ slug, locale: 'en' },
	])
}

async function getPost(params: { slug?: string; locale: 'en' | 'ar' }) {
	const decodedSlug = decodeURIComponent(params.slug || '')
	const type = params.locale == 'ar' ? 'blog.post' : 'blog.post.en'

	return await fetchSanity<Sanity.BlogPost>({
		query: groq`*[_type == $type && metadata.slug.current == $slug][0]{
            ...,
            'body': select(_type == 'image' => asset->, body),
            'readTime': length(pt::text(body)) / 1700,
            'headings': body[style in ['h2', 'h3']]{
                style,
                'text': pt::text(@)
            },
            categories[]->,
            metadata {
                ...,
                'ogimage': image.asset->url
            }
        }`,

		params: { slug: decodedSlug, type },
	})
}
