import { defineField, defineType } from 'sanity'
import { VscFolderOpened } from 'react-icons/vsc'
import { count } from '../../src/utils'

export default defineType({
	name: 'categories',
	title: 'Categories',
	icon: VscFolderOpened,
	type: 'object',
	fields: [
		defineField({
			name: 'links',
			type: 'array',
			of: [{ type: 'link' }],
		}),
	],
	preview: {
		select: {
			links: 'links',
		},
		prepare: ({ links }) => ({
			title: 'Categories',
			subtitle: count(links, 'link'),
		}),
	},
})
