import { PiSquaresFour } from 'react-icons/pi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'app-store-rollup',
	title: 'App store collection',
	icon: PiSquaresFour,
	type: 'object',
	fields: [
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'apps',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'app.store.app' }],
				},
			],
		},
		{
			name: 'limit',
			type: 'number',
			validation: (rule: any) => rule.min(1).integer(),
		},
	],
	preview: {
		select: {
			content: 'category[0].title',
		},
		prepare: ({ content }: any) => ({
			title: content,
			subtitle: 'App store collection',
		}),
	},
}
