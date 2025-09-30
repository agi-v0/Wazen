import { LuDollarSign } from 'react-icons/lu'
import { getBlockText } from '../../src/utils'

export default {
	name: 'pricing-comparison',
	title: 'Pricing comparison',
	icon: LuDollarSign,
	type: 'object',
	fields: [
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'details',
			type: 'array',
			of: [
				{
					name: 'apps',
					type: 'object',
					fields: [
						{
							name: 'title',
							type: 'string',
						},
						{
							name: 'specs',
							type: 'table',
						},
					],
				},
			],
		},
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }: any) => ({
			title: getBlockText(content),
			subtitle: 'Pricing comparison',
		}),
	},
}
