import { VscFolderOpened } from 'react-icons/vsc'
import { count } from '../../src/utils'

export default {
	name: 'categories-list',
	title: 'Categories Selector',
	icon: VscFolderOpened,
	type: 'object',
	fields: [
		{
			name: 'categories',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'blog.category' }] }],
			description: 'Add all blog categories here',
		},
	],
	preview: {
		select: {
			categories: 'categories',
		},
		prepare: ({ categories }: any) => ({
			title: 'Categories',
			subtitle: count(categories),
		}),
	},
}
