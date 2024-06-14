import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'

export default defineType({
	name: 'first-post',
	title: 'First Post',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
	],
	preview: {
		select: {
			content: 'mainTitle',
			media: 'image',
		},
		prepare: () => ({
			title: 'First Post',
		}),
	},
})
