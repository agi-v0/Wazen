import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'
import { IoIosImage } from 'react-icons/io'
import { PiSquaresFour } from 'react-icons/pi'

export default defineType({
	name: 'app.store.app',
	title: 'App',
	icon: PiSquaresFour,
	type: 'document',
	fields: [
		defineField({
			// should match 'languageField' plugin configuration setting, if customized
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
			name: 'description',
			type: 'array',
			of: [
				{ type: 'block' },
				{
					type: 'image',
					icon: IoIosImage,
					fields: [
						defineField({
							name: 'alt',
							type: 'string',
						}),
						defineField({
							name: 'caption',
							type: 'text',
							rows: 2,
						}),
					],
				},
			],
		}),
		defineField({
			name: 'carousel',
			title: 'Images',
			type: 'array',
			of: [
				// defineArrayMember({
				// 	name: 'carousel-items',
				// 	title: 'Image',
				// 	type: 'object',
				// 	fields: [
				// 		{
				// 			name: 'item',
				// 			title: 'Image',
				// 			type: 'image',
				// 			icon: IoIosImage,
				// 			fields: [
				// 				defineField({
				// 					name: 'alt',
				// 					type: 'string',
				// 				}),
				// 				defineField({
				// 					name: 'caption',
				// 					type: 'text',
				// 					rows: 2,
				// 				}),
				// 			],
				// 		},
				// 	],
				// }),
				defineArrayMember({
					name: 'carousel-items',
					title: 'Image',
					type: 'image',
					icon: IoIosImage,
					fields: [
						defineField({
							name: 'alt',
							type: 'string',
						}),
						defineField({
							name: 'caption',
							type: 'text',
							rows: 2,
						}),
					],
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
			name: 'permissions',
			type: 'object',
			fields: [
				{
					name: 'basicInfo',
					type: 'boolean',
				},

				{
					name: 'products',
					type: 'boolean',
				},
				{
					name: 'customers',
					type: 'boolean',
				},
				{
					name: 'orders',
					type: 'boolean',
				},
				{
					name: 'webhook',
					type: 'boolean',
				},
			],
		}),
		defineField({
			name: 'icon',
			type: 'image',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'publishDate',
			type: 'date',
			// validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'publishDate',
			media: 'icon',
		},
	},
	orderings: [
		{
			title: 'Date',
			name: 'date',
			by: [{ field: 'publishDate', direction: 'desc' }],
		},
		{
			title: 'Title',
			name: 'title',
			by: [{ field: 'title', direction: 'asc' }],
		},
	],
})
