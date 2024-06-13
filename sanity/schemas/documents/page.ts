import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'modules',
			type: 'array',
			of: [
				{ type: 'applications' },
				{ type: 'blog-rollup' },
				{ type: 'brief' },
				{ type: 'categories' },
				{ type: 'creative-module' },
				{ type: 'custom-html' },
				{ type: 'faq-list' },
				{ type: 'hero' },
				{ type: 'hero.two' },
				{ type: 'hero.postcard' },
				{ type: 'logo-list' },
				{ type: 'partners' },
				{ type: 'richtext-module' },
				{ type: 'single-testimony' },
				{ type: 'stat-list' },
				{ type: 'start.free.trial' },
				{ type: 'testimonial-list' },
			],
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
		}),
	],
	preview: {
		select: {
			title: 'title',
			slug: 'metadata.slug.current',
			media: 'metadata.image',
		},
		prepare: ({ title, slug }) => ({
			title,
			subtitle: slug && (slug === 'index' ? '/' : `/${slug}`),
		}),
	},
})
