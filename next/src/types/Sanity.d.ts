import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { SanityDocument } from 'next-sanity'

declare global {
	namespace Sanity {
		// documents

		type Site = SanityDocument<{
			title: string
			logo: Logo
			ctas?: CTA[]
			headerMenu?: Navigation
			footerMenu?: Navigation
			social?: Navigation
			staticLinks?: Navigation
			ogimage?: string
		}>

		type Navigation = SanityDocument<{
			title: string
			items?: (Link | Links | LinkList | LinkGroup)[]
		}>

		type PageBase = SanityDocument<{
			title: string
			metadata: Metadata
		}>

		type Page = PageBase & {
			readonly _type: 'page'
			modules?: Module[]
		}

		type BlogPost = PageBase & {
			readonly _type: 'blog.post'
			body: any
			readTime: number
			headings?: { style: string; text: string }[]
			categories: BlogCategory[]
			publishDate: string
		}

		type BlogCategory = SanityDocument<{
			title: string
			title_en: string
		}>

		type Logo = SanityDocument<{
			name: string | StaticImport
			image: {
				default?: Image
				light?: Image
				dark?: Image
			}
			icon: SVGElement
		}>

		type Testimonial = SanityDocument<{
			content: any
			author?: {
				name: string
				title?: string
				image?: Image
			}
		}>

		// objects

		type CTA = {
			link?: Link
			style?: string
		}

		type Image = SanityImageObject &
			Partial<{
				alt: string
				loading: 'lazy' | 'eager'
			}>

		type Link = {
			readonly _type: 'link'
			label: string
			description: string
			type: 'internal' | 'external'
			internal?: Page | BlogPost
			external?: string
			params?: string
		}

		type AppLink = {
			readonly _type: 'link'
			label: string
			description: string
			type: 'internal' | 'external'
			internal?: Page | BlogPost
			external?: string
			params?: string
			image?: Image
		}

		type Group = {
			readonly _type: 'group'
			label: string
			params?: string
		}

		type LinkList = {
			readonly _type: 'link.list'
			label: string
			links?: Link[]
			link?: Link
		}

		type AppsLinkList = {
			readonly _type: 'App.link.list'
			label: string
			links?: AppLink[]
		}

		type LinkGroup = {
			readonly _type: 'link.group'
			label: string
			links?: Link[]
			link?: Link
		}

		type Metadata = {
			title: string
			description: string
			slug: { current: string }
			image?: Image
			ogimage?: string
			noIndex: boolean
		}

		type Module<T = any> = {
			_type: T
			_key: string
		} & T
	}
}

export {}
