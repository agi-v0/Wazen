import { LuDollarSign } from 'react-icons/lu'
import { count, getBlockText } from '../../src/utils'

export default {
	name: 'pricing-list',
	title: 'Pricing list',
	icon: LuDollarSign,
	type: 'object',
	fields: [
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'plans',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'pricing' }],
				},
			],
		},
	],
	preview: {
		select: {
			content: 'content',
			tiers: 'tiers',
		},
		prepare: ({ content, tiers }: any) => ({
			title: getBlockText(content) || count(tiers, 'tier'),
			subtitle: 'Pricing list',
		}),
	},
}
