import { defineField, defineType, defineArrayMember } from 'sanity'
import { GoNumber } from 'react-icons/go'
import { count, getBlockText } from '../../src/utils'

export default defineType({
	name: 'features-grid',
	title: 'Features Grid',
	icon: GoNumber,
	type: 'object',
	groups: [{ name: 'content', title: 'Content' }, { name: 'features' }],

	fields: [
		defineField({
			name: 'pretitle',
			title: 'Pretitle',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
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
							title: 'Icon (Phosphor icons',
							description: `Go to https://phosphoricons.com/ and find the icon of your choice. Copy it's name and paste it here to look it up.`,
							type: 'icon',
						}),
						defineField({
							name: 'title',
							type: 'string',
						}),
						defineField({
							name: 'description',
							type: 'text',
						}),
					],
					preview: {
						select: {
							feature: 'title',
							description: 'description',
							icon: 'icon',
						},
						prepare: ({ feature, description, icon }) => ({
							title: feature,
							subtitle: description,
						}),
					},
				}),
			],
			validation: (rule) => rule.required().min(3).max(6),
			group: 'features',
		}),
	],
	preview: {
		select: {
			content: 'content',
			features: 'features',
		},
		prepare: ({ content, features }) => ({
			title: getBlockText(content) || count(features, 'feature'),
			subtitle: 'Features grid',
		}),
	},
})
