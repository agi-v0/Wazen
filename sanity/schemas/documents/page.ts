import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	fields: [
		defineField({
			// should match 'languageField' plugin configuration setting, if customized
			name: 'language',
			type: 'string',
			readOnly: true,
			hidden: true,
		}),
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'modules',
			type: 'array',
			of: [
				{ type: 'applications' },
				{ type: 'benefits-banner' },
				{ type: 'blog-rollup' },
				{ type: 'brief' },
				{ type: 'brief-group' },
				{ type: 'home-brief-group' },
				{ type: 'categories-list' },
				{ type: 'contact-us' },
				{ type: 'creative-module' },
				{ type: 'custom-html' },
				{ type: 'faq-list' },
				{ type: 'first-post' },
				{ type: 'hero' },
				{ type: 'hero.two' },
				{ type: 'hero.three' },
				{ type: 'hero.four' },
				{ type: 'logo-list' },
				{ type: 'partners' },
				{ type: 'pricing-list' },
				{ type: 'pricing-comparison' },
				{ type: 'richtext-module' },
				{ type: 'single-testimony' },
				{ type: 'stat-list' },
				{ type: 'call.to.action' },
				{ type: 'steps' },
				{ type: 'testimonial-list' },
				{ type: 'testimonial-list-two' },
				{ type: 'how-it-works' },
				{ type: 'features-grid' },
				{ type: 'features-grid-2' },
				{ type: 'solutions-benefits' },
				{ type: 'product-list' },
			],
			options: {
				advanced: {
					select: true,
				},
			},
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
		}),
	],
	orderings: [
		{
			name: 'title',
			title: 'Title',
			by: [{ field: 'title', direction: 'asc' }],
		},
		{
			name: 'slug',
			title: 'Link',
			by: [{ field: 'metadata.slug.current', direction: 'asc' }],
		},
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
