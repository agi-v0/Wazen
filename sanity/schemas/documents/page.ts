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
				{ type: 'first-post' },
				{ type: 'hero' },
				{ type: 'hero.two' },
				{ type: 'hero.three' },
				{ type: 'hero.postcard' },
				{ type: 'logo-list' },
				{ type: 'partners' },
				{ type: 'richtext-module' },
				{ type: 'single-testimony' },
				{ type: 'stat-list' },
				{ type: 'call.to.action' },
				{ type: 'steps' },
				{ type: 'testimonial-list' },
				{ type: 'how-it-works' },
				{ type: 'features-grid' },
				{ type: 'solutions-benefits' },
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
