import { defineField, defineType } from 'sanity'
import { VscFolderOpened } from 'react-icons/vsc'
import { count } from '../../src/utils'
import { ArrayOptions } from 'sanity'

interface ExtendedArrayOptions<T> extends ArrayOptions<T> {
	advanced?: {
		select?: boolean
	}
}

export default defineType({
	name: 'link.group',
	title: 'Link group',
	icon: VscFolderOpened,
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			type: 'string',
		}),
		defineField({
			name: 'links',
			type: 'array',
			of: [{ type: 'link.list' }],
			options: {
				advanced: {
					select: true,
				},
			} as ExtendedArrayOptions<unknown>,
		}),
	],
	preview: {
		select: {
			title: 'label',
			links: 'links',
		},
		prepare: ({ title, links }) => ({
			title,
			subtitle: count(links, 'link'),
		}),
	},
})
