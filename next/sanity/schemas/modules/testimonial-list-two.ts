import { defineField, defineType } from 'sanity'
import { GrBlockQuote } from 'react-icons/gr'
import { count, getBlockText } from '../../src/utils'

export default defineType({
	name: 'testimonial-list-two',
	title: 'Testimonial list two',
	icon: GrBlockQuote,
	type: 'object',
	fields: [
		defineField({
			name: 'pretitle',
			type: 'string',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'testimonials',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
			description: 'Leave empty to display all testimonials',
		}),
	],
	preview: {
		select: {
			content: 'content',
			testimonials: 'testimonials',
		},
		prepare: ({ content, testimonials }) => ({
			title: getBlockText(content) || count(testimonials, 'testimonial'),
			subtitle: 'Testimonial list two',
		}),
	},
})
