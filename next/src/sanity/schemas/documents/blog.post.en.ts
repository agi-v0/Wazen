import { VscEdit } from 'react-icons/vsc'
import { IoIosImage } from 'react-icons/io'

export default {
	name: 'blog.post.en',
	title: 'Blog post',
	icon: VscEdit,
	type: 'document',
	fields: [
		{
			name: 'title',
			type: 'string',
		},
		{
			name: 'body',
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
			name: 'categories',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'blog.category' }],
				},
			],
		},
		{
			name: 'publishDate',
			type: 'date',
			validation: (rule: any) => rule.required(),
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
			media: 'metadata.image',
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
