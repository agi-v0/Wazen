import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'product-list',
	title: 'Product List',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'options', title: 'Options' },
		{ name: 'image', title: 'Image' },
	],
	fields: [
		{
			name: 'pretitle',
			type: 'string',
			group: 'content',
		},
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		},
		{
			name: 'links',
			type: 'array',
			of: [{ type: 'link' }],
		},
		{
			name: 'products',
			type: 'array',
			of: [
				{
					name: 'product',
					type: 'object',
					fields: [
						{
							name: 'productTitle',
							type: 'string',
						},
						{
							name: 'productDescription',
							type: 'string',
						},
						{
							name: 'productImage',
							type: 'image',
						},
						{
							name: 'link',
							type: 'link',
						},
					],
				},
			],
			group: 'content',
		},
	],
	preview: {
		select: {
			content: 'content',
			media: 'image',
		},
		prepare: ({ pretitle, content, media }: any) => ({
			title: pretitle || getBlockText(content),
			subtitle: 'Products',
			media,
		}),
	},
}
