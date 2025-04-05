import { VscEdit } from 'react-icons/vsc'
import { IoIosImage } from 'react-icons/io'
import { PiSquaresFour } from 'react-icons/pi'

export default {
	name: 'app.store.app',
	title: 'App',
	icon: PiSquaresFour,
	type: 'document',
	fields: [
		{
			// should match 'languageField' plugin configuration setting, if customized
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
			name: 'description',
			type: 'array',
			of: [
				{ type: 'block' },
				{
					type: 'image',
					icon: IoIosImage,
					fields: [
						{
							name: 'alt',
							type: 'string',
						},
						{
							name: 'caption',
							type: 'text',
							rows: 2,
						},
					],
				},
			],
		},
		{
			name: 'images',
			type: 'array',
			of: [
				// {
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
				// 				{
				// 					name: 'alt',
				// 					type: 'string',
				// 				},
				// 				{
				// 					name: 'caption',
				// 					type: 'text',
				// 					rows: 2,
				// 				},
				// 			],
				// 		},
				// 	],
				// },
				{
					name: 'carousel-items',
					title: 'Image',
					type: 'image',
					icon: IoIosImage,
					fields: [
						{
							name: 'alt',
							type: 'string',
						},
						{
							name: 'caption',
							type: 'text',
							rows: 2,
						},
					],
				},
			],
		},
		{
			name: 'call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		},
		{
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
		},
		{
			name: 'icon',
			type: 'image',
			validation: (rule: any) => rule.required(),
		},
		{
			name: 'publishDate',
			type: 'date',
			// validation: (rule: any) => rule.required(),
		},
		{
			name: 'metadata',
			type: 'metadata',
		},
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
}
