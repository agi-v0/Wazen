import { VscQuestion } from 'react-icons/vsc'
import { getBlockText } from '../../src/utils'

export default {
	name: 'faq',
	title: 'FAQ',
	icon: VscQuestion,
	type: 'document',
	fields: [
		{
			name: 'language',
			type: 'string',
			options: {
				list: ['ar', 'en'],
			},
		},
		{
			name: 'question',
			type: 'string',
		},
		{
			name: 'answer',
			type: 'array',
			of: [{ type: 'block' }],
		},
	],
	preview: {
		select: {
			question: 'question',
			answer: 'answer',
		},
		prepare: ({ question, answer }: any) => ({
			title: question,
			subtitle: getBlockText(answer),
		}),
	},
}
