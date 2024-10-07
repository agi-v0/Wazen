import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscQuestion } from 'react-icons/vsc'
import { getBlockText } from '../../src/utils'

export default defineType({
	name: 'faq-list',
	title: 'FAQ list',
	type: 'object',
	icon: VscQuestion,
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'items',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'faq' }] }],
		}),
		defineField({
			name: 'sideNote',
			type: 'object',
			fields: [
				defineField({
					name: 'title',
					type: 'string',
				}),
				defineField({
					name: 'subtitle',
					type: 'text',
				}),
				defineField({
					name: 'link',
					type: 'link',
				}),
			],
		}),
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }) => ({
			title: getBlockText(content),
			subtitle: 'FAQ list',
		}),
	},
})
