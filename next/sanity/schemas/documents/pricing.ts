import { defineArrayMember, defineField, defineType } from 'sanity'
import { LuDollarSign } from 'react-icons/lu'
import { ArrayOptions } from 'sanity'

interface ExtendedArrayOptions<T> extends ArrayOptions<T> {
	advanced?: {
		select?: boolean
	}
}

export default defineType({
	name: 'pricing',
	title: 'Pricing tier',
	icon: LuDollarSign,
	type: 'document',
	fields: [
		defineField({
			name: 'language',
			type: 'string',
			readOnly: true,
			hidden: true,
		}),
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'highlight',
			type: 'string',
			description: 'مثل الأكثر طلبا، الأعلى قيمة، ...',
		}),
		defineField({
			name: 'apps',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'app',
					type: 'object',
					fields: [
						defineField({
							name: 'title',
							type: 'string',
						}),
						defineField({
							name: 'active',
							type: 'boolean',
						}),
					],
				}),
			],
			options: {
				advanced: {
					select: true,
				},
			} as ExtendedArrayOptions<unknown>,
		}),
		defineField({
			name: 'price',
			type: 'object',
			options: {
				columns: 2,
			},
			fields: [
				defineField({
					name: 'monthly',
					type: 'number',
				}),
				defineField({
					name: 'yearly',
					type: 'number',
				}),
			],
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
					name: 'feature',
					type: 'object',
					fields: [
						defineField({
							name: 'title',
							type: 'string',
						}),
						defineField({
							name: 'active',
							type: 'boolean',
						}),
					],
				}),
			],
			options: {
				advanced: {
					select: true,
				},
			} as ExtendedArrayOptions<unknown>,
		}),
		defineField({
			name: 'details',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'apps',
					type: 'object',
					fields: [
						defineField({
							name: 'title',
							type: 'string',
						}),
						defineField({
							name: 'specs',
							type: 'array',
							of: [
								defineArrayMember({
									name: 'spec',
									type: 'object',
									fields: [
										defineField({
											name: 'title',
											title: 'Specification title',
											type: 'string',
										}),
										defineField({
											name: 'active',
											type: 'boolean',
										}),
										defineField({
											name: 'count',
											type: 'number',
										}),
										defineField({
											name: 'unlimited',
											title: 'Unlimited?',
											type: 'boolean',
										}),
									],
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
			title: 'title',
			price: 'price',
		},
		prepare: ({ title, price }) => {
			return {
				title,
				subtitle: [price.month, price.yearly].filter(Boolean).join(' '),
			}
		},
	},
})
