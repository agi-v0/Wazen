import { defineField, defineType, defineArrayMember } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText, count } from '../../src/utils'

export default defineType({
	name: 'solutions-benefits',
	title: 'Benefits',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	fields: [
		defineField({
			name: 'benefits',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({
							name: 'pretitle',
							title: 'Pretitle',
							type: 'string',
						}),
						defineField({
							name: 'content',
							title: 'Content',
							type: 'array',
							of: [{ type: 'block' }],
						}),
						defineField({
							name: 'image',
							type: 'image',
							fields: [
								defineField({
									name: 'alt',
									type: 'string',
								}),
							],
						}),
					],
				}),
			],
		}),
	],

	preview: {
		select: {
			benefits: 'benefits',
		},
		prepare: ({ benefits }) => ({
			title: count(benefits, 'benefit'),
			subtitle: 'Benefits',
		}),
	},
})
