import {
	defineArrayMember,
	defineField,
	defineType,
	useFormValue,
	useGetFormValue,
} from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { count, getBlockText } from '../../src/utils'

export default defineType({
	name: 'features-grid-2',
	title: 'Features grid 2',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [{ name: 'content', title: 'Content' }, { name: 'features' }],
	fields: [
		defineField({
			name: 'pretitle',
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
			name: 'features',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'grid',
					type: 'object',
					fields: [
						defineField({
							name: 'features',
							type: 'array',
							of: [
								defineArrayMember({
									name: 'feature',
									type: 'object',
									fields: [
										defineField({
											name: 'icon',
											title: 'Icon name',
											type: 'icon',
										}),
										defineField({
											name: 'image',
											type: 'image',
											fields: [
												defineField({
													name: 'alt',
													type: 'string',
												}),
												defineField({
													name: 'loading',
													type: 'string',
													options: {
														layout: 'radio',
														list: ['lazy', 'eager'],
													},
													initialValue: 'lazy',
												}),
											],
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
							options: {
								advanced: { select: true },
							},
							validation: (rule) => rule.required().min(1).max(4),
						}),
					],
					preview: {
						select: { feature: 'features' },
						prepare: ({ feature }) => ({
							title: count(feature, 'feature'),
						}),
					},
				}),
			],
			group: 'features',
			options: {
				advanced: {
					select: true,
				},
			},
		}),
	],
	preview: {
		select: {
			content: 'content',
			features: 'features',
		},
		prepare: ({ content, features }) => ({
			title: getBlockText(content) || count(features, 'feature'),
			subtitle: 'Features Grid 2',
		}),
	},
})
