import { defineField, defineType, defineArrayMember } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText, count } from '../../src/utils'

export default defineType({
	name: 'solutions-benefits',
	title: 'Benefits',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	// 	defineField({
	// 		name: 'content',
	// 		type: 'array',
	// 		of: [{ type: 'block' }],
	// 	}),
	// 	defineField({
	// 		name: 'benefits',
	// 		type: 'array',
	// 		of: [
	// 			defineArrayMember({
	// 				type: 'object',
	// 				fields: [
	// 					defineField({
	// 						name: 'pretitle',
	// 						type: 'string',
	// 						group: 'content',
	// 					}),
	// 					defineField({
	// 						name: 'content',
	// 						type: 'array',
	// 						of: [{ type: 'block' }],
	// 						group: 'content',
	// 					}),
	// 					defineField({
	// 						name: 'image',
	// 						type: 'image',
	// 						fields: [
	// 							defineField({
	// 								name: 'alt',
	// 								type: 'string',
	// 							}),
	// 							defineField({
	// 								name: 'onRight',
	// 								type: 'boolean',
	// 								initialValue: false,
	// 							}),
	// 							defineField({
	// 								name: 'loading',
	// 								type: 'string',
	// 								options: {
	// 									layout: 'radio',
	// 									list: ['lazy', 'eager'],
	// 								},
	// 								initialValue: 'lazy',
	// 							}),
	// 						],
	// 					}),
	// 				],
	// 			}),
	// 		],
	// 	}),
	// ],
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
							title: 'Image',
							type: 'image',
						}),
					],
					preview: {
						select: {
							content: 'content',
							media: 'image',
						},
						prepare: ({ content, media }) => ({
							title: getBlockText(content),
							subtitle: 'Benefit',
							media: media,
						}),
					},
				}),
			],
			// validation: (rule) => rule.required().min(6).max(6),
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
