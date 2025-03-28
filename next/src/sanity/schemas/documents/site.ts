import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'site',
	title: 'Site',
	type: 'document',
	groups: [
		{ name: 'general', title: 'General', default: true },
		{ name: 'navigation', title: 'Navigation' },
	],
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
			group: 'general',
		}),
		defineField({
			name: 'logo',
			type: 'logo',
			options: {
				collapsable: true,
				collapsed: true,
			},
			group: 'general',
		}),
		defineField({
			name: 'ctas',
			title: 'Main call-to-action(s)',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'navigation',
		}),
		defineField({
			name: 'headerMenu',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		}),
		defineField({
			name: 'footerMenu',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		}),
		defineField({
			name: 'social',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		}),
		defineField({
			name: 'staticLinks',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		}),
		defineField({
			name: 'ogimage',
			title: 'Open Graph Image (global)',
			description: 'Used for social sharing previews',
			type: 'image',
			group: 'general',
		}),
		defineField({
			name: 'ga4',
			title: 'Google Analytics 4 Tag',
			description: 'Your measurement ID. Usually starts with G-.',
			type: 'string',
			group: 'general',
		}),
		defineField({
			name: 'gtmId',
			title: 'Google Tag Manager Container ID',
			description: 'Your GTM container ID. Usually starts with GTM-.',
			type: 'string',
			group: 'general',
		}),
	],
	preview: {
		prepare: () => ({
			title: 'Site',
		}),
	},
})
