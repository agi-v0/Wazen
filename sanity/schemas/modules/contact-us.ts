import { defineArrayMember, defineField, defineType } from 'sanity'
import { getBlockText } from '../../src/utils'
import { VscEdit } from 'react-icons/vsc'

export default defineType({
	name: 'contact-us',
	title: 'Contact Us',
	icon: VscEdit,
	type: 'object',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string'
		}),
		defineField({
			name: 'contactInfo',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({
							name: 'title',
							type: 'string',
						}),
						defineField({
							name: 'subtitle',
							type: 'string',
						}),
						defineField({
							name: 'link',
							type: 'link',
						}),
					],
					preview: {
						select: {
							title: 'text',
						},
					},
				}),
			],
		}),

	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }) => ({
			title: getBlockText(content),
			subtitle: 'Contact Us',
		}),
	},
})
