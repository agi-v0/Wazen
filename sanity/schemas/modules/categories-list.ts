import { defineField, defineType } from 'sanity'
import { VscFolderOpened } from 'react-icons/vsc'
import { count } from '../../src/utils'

export default defineType({
	name: 'categories-list',
	title: 'Categories Selector',
	icon: VscFolderOpened,
	type: 'object',
	fields: [
		defineField({
			name: 'categories',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'blog.category' }] }],
			description: 'Add all blog categories here',
		}),
	],
	preview: {
		select: {
			categories: 'categories',
		},
		prepare: ({ categories }) => ({
			title: 'Categories',
			subtitle: count(categories, 'category'),
		}),
	},
})
