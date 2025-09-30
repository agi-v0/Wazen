// import { stegaClean } from 'next-sanity'

import { stegaClean } from 'next-sanity'

export default function processUrl(
	page: Sanity.PageBase,
	{
		base = true,
		params,
	}: {
		base?: boolean
		params?: string
	} = {},
) {
	const directory = () => {
		switch (page?._type) {
			case 'blog.post':
				return 'blog'
			case 'help.center.post':
				return 'help-center'
			default:
				return null
		}
	}

	const slug = page?.metadata?.slug?.current
	const path = slug === 'index' ? null : slug

	return (
		(base ? process.env.NEXT_PUBLIC_BASE_URL : '/') +
		[directory(), path, stegaClean(params)].filter(Boolean).join('/')
	)
}
