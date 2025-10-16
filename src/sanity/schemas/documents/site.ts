export default {
	name: 'site',
	title: 'Site',
	type: 'document',
	groups: [
		{ name: 'general', title: 'General', default: true },
		{ name: 'navigation', title: 'Navigation' },
	],
	fields: [
		{
			// should match 'languageField' plugin configuration setting, if customized
			name: 'language',
			type: 'string',
			readOnly: true,
			hidden: true,
		},
		{
			name: 'title',
			type: 'string',
			group: 'general',
		},
		{
			name: 'logo',
			type: 'logo',
			options: {
				collapsable: true,
				collapsed: true,
			},
			group: 'general',
		},
		{
			name: 'callToActionDoc',
			title: 'Default Call to Action Popup',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'call.to.action.doc' }] }],
		},
		{
			name: 'ctas',
			title: 'Main call-to-action(s)',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'navigation',
		},
		{
			name: 'headerMenu',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		},
		{
			name: 'footerMenu',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		},
		{
			name: 'social',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		},
		{
			name: 'staticLinks',
			type: 'reference',
			to: [{ type: 'navigation' }],
			group: 'navigation',
		},
		{
			name: 'ogimage',
			title: 'Open Graph Image (global)',
			description: 'Used for social sharing previews',
			type: 'image',
			group: 'general',
		},
		// {
		// 	name: 'ga4',
		// 	title: 'Google Analytics 4 Tag',
		// 	description: 'Your measurement ID. Usually starts with G-.',
		// 	type: 'string',
		// 	group: 'general',
		// },
		{
			name: 'gtmId',
			title: 'Google Tag Manager Container ID',
			description: 'Your GTM container ID. Usually starts with GTM-.',
			type: 'string',
			group: 'general',
		},
	],
	preview: {
		prepare: () => ({
			title: 'Site',
		}),
	},
}
