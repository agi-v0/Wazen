import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default defineType({
	name: 'single-testimony',
	title: 'Single Testimony',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'options', title: 'Options' },
		{ name: 'image', title: 'Image' },
	],
	fieldsets: [
		{ name: 'image', title: 'Image', options: { columns: 2 } },
		{ name: 'alignment', title: 'Alignment', options: { columns: 2 } },
	],
	fields: [
		defineField({
			name: 'logoImage',
			type: 'image',
			fields: [
				defineField({
					name: 'alt',
					type: 'string',
				}),
			],
			group: 'content',
		}),
		defineField({
			name: 'testimony',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'image',
			type: 'image',
			fields: [
				defineField({
					name: 'alt',
					type: 'string',
				}),
			],
			group: 'content',
		}),
		defineField({
			name: 'client',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'position',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'textAlign',
			type: 'string',
			options: {
				layout: 'radio',
				list: ['left', 'center', 'right'],
			},
			initialValue: 'center',
			group: 'options',
			fieldset: 'alignment',
		}),
		defineField({
			name: 'alignItems',
			title: 'Vertical alignment',
			type: 'string',
			options: {
				layout: 'radio',
				list: [
					{ title: 'Top', value: 'start' },
					'center',
					{ title: 'Bottom', value: 'end' },
				],
			},
			initialValue: 'center',
			group: 'options',
			fieldset: 'alignment',
		}),
	],
	preview: {
		select: {
			content: 'mainTitle',
			media: 'image',
		},
		prepare: ({ content, media }) => ({
			title: getBlockText(content),
			subtitle: 'Single Testimony',
			media,
		}),
	},
})
