import { defineField, defineType, defineArrayMember } from 'sanity'
import { GoNumber } from 'react-icons/go'
import { count, getBlockText } from '../../src/utils'

export default defineType({
	name: 'features-grid',
	title: 'Features Grid',
	icon: GoNumber,
	type: 'object',
	fields: [
		defineField({
			name: 'pretitle',
			title: 'Pretitle',
			type: 'string',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		}),
		defineField({
			name: 'features',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({
							name: 'icon',
							title: 'Icon name',
							type: 'string',
						}),
						defineField({
							name: 'feature',
							title: 'Feature text',
							type: 'array',
							of: [{ type: 'block' }],
						}),
					],
					preview: {
						select: {
							feature: 'feature',
							icon: 'icon',
						},
						prepare: ({ feature, icon }) => ({
							title: getBlockText(feature),
							subtitle: icon,
						}),
					},
				}),
			],
			// validation: (rule) => rule.required().min(6).max(6),
		}),
	],
	preview: {
		select: {
			content: 'content',
			features: 'features',
		},
		prepare: ({ content, features }) => ({
			title: 'Features Grid',
			subtitle: getBlockText(content) || count(features, 'feature'),
		}),
	},
})
