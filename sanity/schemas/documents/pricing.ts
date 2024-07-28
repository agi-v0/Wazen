import { defineField, defineType } from 'sanity'
import { LuDollarSign } from 'react-icons/lu'

export default defineType({
	name: 'pricing',
	title: 'Pricing tier',
	icon: LuDollarSign,
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'highlight',
			type: 'string',
			description: 'e.g. Recommended, Most popular, etc.',
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
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
	],
	preview: {
		select: {
			title: 'title',
			price: 'price',
		},
		prepare: ({ title, price }) => {
			console.log(price)

			return {
				title,
				subtitle: [
					price.month,
					price.yearly,
				]
					.filter(Boolean)
					.join(' '),
			}
		},
	},
})