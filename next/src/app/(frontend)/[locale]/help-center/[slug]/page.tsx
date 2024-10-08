import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { notFound } from 'next/navigation'
import Post from '@/ui/modules/blog/Post'
import processMetadata from '@/lib/processMetadata'
import { unstable_setRequestLocale } from 'next-intl/server'

type Props = {
	params: { slug?: string; locale: string }
}

export default async function getStaticPaths({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const post = await getStaticProps(params)
	if (!post) notFound()
	return <Post post={post} locale={params.locale} />
}

export async function generateMetadata({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const post = await getStaticProps(params)
	if (!post) notFound()
	return processMetadata(post, params.locale)
}

export async function generateStaticParams() {
	const slugs = await fetchSanity<string[]>(
		groq`*[_type == 'help.center.post' && defined(metadata.slug.current)].metadata.slug.current`,
	)

	return slugs.map((slug) => ({ slug }))
}

async function getStaticProps(params: Props['params']) {
	const decodedSlug = decodeURIComponent(params.slug || '')

	const type =
		params.locale == 'ar' ? 'help.center.post' : 'help.center.post.en'

	return await fetchSanity<Sanity.BlogPost>(
		groq`*[_type == $type && metadata.slug.current == $slug][0]{
            ...,
            'body': select(_type == 'image' => asset->, body),
            'readTime': length(pt::text(body)) / 200,
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
		{
			params: {
				slug: decodedSlug,
				type,
			},
			tags: [type],
		},
	)
}
