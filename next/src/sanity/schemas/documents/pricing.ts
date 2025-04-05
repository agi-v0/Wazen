import { LuDollarSign } from 'react-icons/lu'

interface ExtendedArrayOptions<T> {
	advanced?: {
		select?: boolean
	}
}

export default {
	name: 'pricing',
	title: 'Pricing tier',
	icon: LuDollarSign,
	type: 'document',
	fieldsets: [{ name: 'priceInfo', title: 'Price info' }],
	fields: [
		{
			name: 'language',
			type: 'string',
			readOnly: true,
			hidden: true,
		},
		{
			name: 'title',
			type: 'string',
		},
		{
			name: 'highlight',
			type: 'string',
			description: 'مثل الأكثر طلبا، الأعلى قيمة، ...',
		},
		{
			name: 'apps',
			type: 'array',
			of: [
				{
					name: 'app',
					type: 'object',
					fields: [
						{
							name: 'title',
							type: 'string',
						},
						{
							name: 'icon',
							title: 'Icon (Phosphor icons)',
							description: `Go to https://phosphoricons.com/ and find the icon of your choice. Copy it's name and paste it here to look it up.`,
							type: 'icon',
						},
						{
							name: 'active',
							type: 'boolean',
						},
					],
				},
			],
			options: {
				advanced: {
					select: true,
				},
			} as ExtendedArrayOptions<unknown>,
		},
		{
			name: 'Display price',
			type: 'boolean',
			initialValue: true,
			fieldset: 'priceInfo',
		},
		// {
		// 	name: 'label',
		// 	type: 'string',
		// 	fieldset: 'priceInfo',
		// },
		{
			name: 'price',
			type: 'object',
			options: {
				columns: 2,
			},
			fields: [
				{
					name: 'monthly',
					type: 'string',
				},
				{
					name: 'yearly',
					type: 'string',
				},
			],
			fieldset: 'priceInfo',
		},
		{
			name: 'call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		},
		{
			name: 'features',
			type: 'array',
			of: [
				{
					name: 'feature',
					type: 'object',
					fields: [
						{
							name: 'title',
							type: 'string',
						},
						{
							name: 'active',
							type: 'boolean',
						},
					],
				},
			],
			options: {
				advanced: {
					select: true,
				},
			} as ExtendedArrayOptions<unknown>,
		},
	],
	preview: {
		select: {
			title: 'title',
			price: 'price',
		},
		prepare: ({ title, price }: any) => {
			return {
				title,
				subtitle: [price.month, price.yearly].filter(Boolean).join(' '),
			}
		},
	},
}
