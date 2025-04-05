import { GoNumber } from 'react-icons/go'
import { count, getBlockText } from '../../src/utils'

export default {
	name: 'benefits-banner',
	title: 'Benefits Banner',
	icon: GoNumber,
	type: 'object',
	fields: [
		{
			name: 'features',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'icon',
							title: 'Icon name',
							type: 'icon',
						},
						{
							name: 'title',
							type: 'string',
						},
						{
							name: 'description',
							type: 'text',
						},
					],
					preview: {
						select: {
							feature: 'title',
							description: 'description',
							icon: 'icon',
						},
						prepare: ({ feature, description, icon }: any) => ({
							title: feature,
							subtitle: description,
						}),
					},
				},
			],
		},
	],
	preview: {
		select: {
			content: 'content',
			features: 'features',
		},
		prepare: ({ content, features }: any) => ({
			title: getBlockText(content) || count(features, 'benefit'),
			subtitle: 'Benefits banner',
		}),
	},
}
