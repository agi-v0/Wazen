import { GrBlockQuote } from 'react-icons/gr'

export default {
	name: 'testimonial',
	title: 'Testimonial',
	icon: GrBlockQuote,
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
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'author',
			type: 'object',
			fields: [
				{
					name: 'name',
					type: 'string',
				},
				{
					name: 'title',
					type: 'string',
				},
				{
					name: 'image',
					type: 'image',
				},
			],
		},
	],
	preview: {
		select: {
			author: 'author',
		},
		prepare: ({ author }: any) => ({
			title: author?.name || 'No author',
			subtitle: 'Testimonial',
			media: author?.image,
		}),
	},
}
