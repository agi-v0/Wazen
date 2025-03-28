import { defineField, defineType } from 'sanity'
import { PiSquaresFour } from 'react-icons/pi'
import { getBlockText } from '../../src/utils'

export default defineType({
	name: 'app-store-rollup',
	title: 'App store collection',
	icon: PiSquaresFour,
	type: 'object',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'apps',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'app.store.app' }],
				},
			],
		}),
		defineField({
			name: 'limit',
			type: 'number',
			validation: (Rule) => Rule.min(1).integer(),
		}),
	],
	preview: {
		select: {
			content: 'category[0].title',
		},
		prepare: ({ content }) => ({
			title: content,
			subtitle: 'App store collection',
		}),
	},
})
