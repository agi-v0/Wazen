import { VscFolderOpened } from 'react-icons/vsc'
import { count } from '../../src/utils'

export default {
	name: 'link.list',
	title: 'Link list',
	icon: VscFolderOpened,
	type: 'object',
	fields: [
		{
			name: 'label',
			type: 'string',
		},
		{
			name: 'links',
			type: 'array',
			of: [{ type: 'link' }],
		},
	],
	preview: {
		select: {
			title: 'label',
			links: 'links',
		},
		prepare: ({ title, links }: any) => ({
			title,
			subtitle: count(links, 'link'),
		}),
	},
}
