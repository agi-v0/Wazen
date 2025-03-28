import { defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'
import { getBlockText } from '../../src/utils'

export default defineType({
	name: 'blog-rollup',
	title: 'Blog rollup',
	icon: VscEdit,
	type: 'object',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'category',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'blog.category' }],
				},
			],
		}),
		defineField({
			name: 'layout',
			type: 'string',
			options: {
				list: ['grid', 'carousel'],
				layout: 'radio',
			},
			initialValue: 'carousel',
		}),
		defineField({
			name: 'limit',
			type: 'number',
			validation: (Rule) => Rule.min(1).integer(),
		}),
	],
	preview: {
		select: {
			content: 'category.0.title',
		},
		prepare: ({ content }) => ({
			title: content,
			subtitle: 'Blog rollup',
		}),
	},
})
