import { defineField, defineType } from 'sanity'
import { VscFolderOpened } from 'react-icons/vsc'
import { count } from '../../src/utils'

export default defineType({
	name: 'help-center-categories-list',
	title: 'Help Center Categories Selector',
	icon: VscFolderOpened,
	type: 'object',
	fields: [
		defineField({
			name: 'categories',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'help.center.category' }] }],
			description: 'Add all help center categories here',
		}),
	],
	preview: {
		select: {
			categories: 'categories',
		},
		prepare: ({ categories }) => ({
			title: 'Categories',
			subtitle: count(categories),
		}),
	},
})
