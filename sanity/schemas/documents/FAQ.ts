import { defineField, defineType, defineArrayMember } from 'sanity'
import { VscQuestion } from 'react-icons/vsc'
import { getBlockText } from '../../src/utils'

export default defineType({
	name: 'faq',
	title: 'FAQ',
	icon: VscQuestion,
	type: 'document',
	fields: [
		defineField({
			name: 'question',
			type: 'string',
		}),
		defineField({
			name: 'answer',
			type: 'array',
			of: [{ type: 'block' }],
		}),
	],
	preview: {
		select: {
			question: 'question',
			answer: 'answer',
		},
		prepare: ({ question, answer }) => ({
			title: question,
			subtitle: getBlockText(answer),
		}),
	},
})
