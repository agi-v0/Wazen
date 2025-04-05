import { VscFolderOpened } from 'react-icons/vsc'
import { count } from '../../src/utils'

interface ExtendedArrayOptions<T> {
	advanced?: {
		select?: boolean
	}
}

export default {
	name: 'link.group',
	title: 'Link group',
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
			of: [{ type: 'link.list' }],
			options: {
				advanced: {
					select: true,
				},
			} as ExtendedArrayOptions<unknown>,
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
