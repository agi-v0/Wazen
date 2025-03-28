import { defineArrayMember, defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default defineType({
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
			name: 'links',
			type: 'array',
			of: [{ type: 'link' }],
		}),
		defineField({
			name: 'products',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'product',
					type: 'object',
					fields: [
						defineField({
							name: 'productTitle',
							type: 'string',
						}),
						defineField({
							name: 'productDescription',
							type: 'string',
						}),
						defineField({
							name: 'productImage',
							type: 'image',
						}),
						defineField({
							name: 'link',
							type: 'link',
						}),
					],
				}),
			],
			group: 'content',
		}),
	],
	preview: {
		select: {
			pretitle: 'pretitle',
			content: 'content',
			media: 'image',
		},
		prepare: ({ pretitle, content, media }) => ({
			title: pretitle || getBlockText(content),
			subtitle: 'Products',
			media,
		}),
	},
})
