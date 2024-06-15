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
							name: 'value',
							type: 'string',
						}),
						defineField({
							name: 'text',
							type: 'string',
						}),
					],
					preview: {
						select: {
							title: 'value',
							subtitle: 'text',
						},
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			content: 'content',
			steps: 'steps',
		},
		prepare: ({ content, steps }) => ({
			title: getBlockText(content) || count(steps, 'step'),
			subtitle: 'How it works',
		}),
	},
})
