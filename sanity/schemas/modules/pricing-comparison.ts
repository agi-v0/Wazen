import { defineField, defineType } from 'sanity'
import { LuDollarSign } from 'react-icons/lu'
import { getBlockText } from '../../src/utils'

export default defineType({
	name: 'pricing-comparison',
	title: 'Pricing comparison',
	icon: LuDollarSign,
	type: 'object',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }) => ({
			title: getBlockText(content),
			subtitle: 'Pricing comparison',
		}),
	},
})