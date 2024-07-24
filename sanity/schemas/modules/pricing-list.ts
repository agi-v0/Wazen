import { defineField, defineType } from 'sanity'
import { LuDollarSign } from 'react-icons/lu'
import { count, getBlockText } from '../../src/utils'

export default defineType({
	name: 'pricing-list',
	title: 'Pricing list',
	icon: LuDollarSign,
	type: 'object',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'tiers',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'pricing' }],
				},
			],
		}),
	],
	preview: {
		select: {
			content: 'content',
			tiers: 'tiers',
		},
		prepare: ({ content, tiers }) => ({
			title: getBlockText(content) || count(tiers, 'tier'),
			subtitle: 'Pricing list',
		}),
	},
})