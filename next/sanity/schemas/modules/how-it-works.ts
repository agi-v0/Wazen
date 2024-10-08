import { defineField, defineType, defineArrayMember } from 'sanity'
import { GoNumber } from 'react-icons/go'
import { count, getBlockText } from '../../src/utils'

export default defineType({
	name: 'how-it-works',
	title: 'How it works',
	icon: GoNumber,
	type: 'object',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'steps',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({
							name: 'image',
							type: 'image',
						}),
						defineField({
							name: 'title',
							type: 'string',
						}),
						defineField({
							name: 'description',
							type: 'text',
						}),
					],
					preview: {
						select: {
							title: 'text',
							subtitle: 'description',
						},
						prepare: ({ title, subtitle }) => ({
							title: title,
							subtitle: subtitle,
						}),
					},
				}),
			],
			validation: (rule) => rule.required().min(3).max(3),
		}),
	],
	preview: {
		select: {
			content: 'content',
			steps: 'steps',
		},
		prepare: ({ content, steps }) => ({
			title: getBlockText(content),
			subtitle: 'How it works',
		}),
	},
})
