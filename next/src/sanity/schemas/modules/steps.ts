import { defineField, defineType } from 'sanity'
import { getBlockText } from '../../src/utils'
import { VscSymbolMisc } from 'react-icons/vsc'

export default defineType({
	name: 'steps',
	title: 'Steps',
	icon: VscSymbolMisc,
	type: 'object',
	fields: [
		defineField({
			name: 'mainTitle',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'content1',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'content2',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'content3',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'image1',
			type: 'image',
		}),
		defineField({
			name: 'image2',
			type: 'image',
		}),
		defineField({
			name: 'image3',
			type: 'image',
		}),
	],
	preview: {
		select: {
			content: 'content',
			subtitle: 'subtitle',
		},
		prepare: ({ content, subtitle }) => ({
			title: subtitle || getBlockText(content),
			subtitle: 'Steps',
		}),
	},
})
