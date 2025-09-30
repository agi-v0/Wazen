import { VscQuestion } from 'react-icons/vsc'
import { getBlockText } from '../../src/utils'

export default {
	name: 'faq-list',
	title: 'FAQ list',
	type: 'object',
	icon: VscQuestion,
	fields: [
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'items',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'faq' }] }],
		},
		{
			name: 'sideNote',
			type: 'object',
			fields: [
				{
					name: 'title',
					type: 'string',
				},
				{
					name: 'subtitle',
					type: 'text',
				},
				{
					name: 'link',
					type: 'link',
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
			subtitle: 'FAQ list',
		}),
	},
}
