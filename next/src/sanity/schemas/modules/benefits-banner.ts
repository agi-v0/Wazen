import { defineField, defineType, defineArrayMember } from 'sanity'
import { GoNumber } from 'react-icons/go'
import { count, getBlockText } from '../../src/utils'

export default defineType({
	name: 'benefits-banner',
	title: 'Benefits Banner',
	icon: GoNumber,
	type: 'object',
	fields: [
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
		}),
	],
	preview: {
		select: {
			content: 'content',
			features: 'features',
		},
		prepare: ({ content, features }) => ({
			title: getBlockText(content) || count(features, 'benefit'),
			subtitle: 'Benefits banner',
		}),
	},
})
