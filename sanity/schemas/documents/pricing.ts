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
	fieldsets: [{ name: 'priceInfo', title: 'Price info' }],
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
							name: 'icon',
							title: 'Icon (Phosphor icons',
							description: `Go to https://phosphoricons.com/ and find the icon of your choice. Copy it's name and paste it here to look it up.`,
							type: 'icon',
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
			name: 'displayPrice',
			title: 'Display price',
			type: 'boolean',
			initialValue: true,
			fieldset: 'priceInfo',
		}),
		// defineField({
		// 	name: 'label',
		// 	type: 'string',
		// 	fieldset: 'priceInfo',
		// }),
		defineField({
			name: 'price',
			type: 'object',
			options: {
				columns: 2,
			},
			fields: [
				defineField({
					name: 'monthly',
					type: 'string',
				}),
				defineField({
					name: 'yearly',
					type: 'string',
				}),
			],
			fieldset: 'priceInfo',
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
