import { GoNumber } from 'react-icons/go'
import { count, getBlockText } from '../../src/utils'

export default {
	name: 'stat-list',
	title: 'Stat list',
	icon: GoNumber,
	type: 'object',
	fields: [
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'stats',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'value',
							type: 'string',
						},
						{
							name: 'text',
							type: 'string',
						},
					],
					preview: {
						select: {
							title: 'value',
							subtitle: 'text',
						},
					},
				},
			],
		},
	],
	preview: {
		select: {
			content: 'content',
			stats: 'stats',
		},
		prepare: ({ content, stats }: any) => ({
			title: getBlockText(content) || count(stats, 'stat'),
			subtitle: 'Stat list',
		}),
	},
}
