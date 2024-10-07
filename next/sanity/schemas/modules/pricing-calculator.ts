import { defineArrayMember, defineField, defineType } from 'sanity'
import { LuDollarSign } from 'react-icons/lu'
import { getBlockText } from '../../src/utils'

export default defineType({
	name: 'pricing-calculator',
	title: 'Pricing Calculator',
	icon: LuDollarSign,
	type: 'object',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'details',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'apps',
					type: 'object',
					fields: [
						defineField({
							name: 'title',
							type: 'string',
						}),
						defineField({
							name: 'specs',
							type: 'table',
						}),
					],
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
			subtitle: 'Pricing Calculator',
		}),
	},
})
