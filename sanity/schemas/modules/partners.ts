import { defineField, defineType } from 'sanity'
import { getBlockText } from '../../src/utils'
import { VscSymbolMisc } from 'react-icons/vsc'

export default defineType({
	name: 'partners',
	title: 'Partners',
	icon: VscSymbolMisc,
	type: 'object',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'Subtitle',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'logoType',
			type: 'string',
			options: {
				layout: 'radio',
				list: ['default', 'light', 'dark'],
			},
			initialValue: 'default',
		}),
		defineField({
			name: 'logos',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'logo' }] }],
		}),
	],
	preview: {
		select: {
			content: 'content',
			subtitle: 'subtitle',
		},
		prepare: ({ content, subtitle }) => ({
			title: subtitle || getBlockText(content),
			subtitle: 'Partners',
		}),
	},
})
