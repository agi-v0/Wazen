import { defineField, defineType } from 'sanity'
import { VscFolderOpened } from 'react-icons/vsc'
import { count } from '../../src/utils'

export default defineType({
	name: 'app.link.list',
	title: 'App Link list',
	icon: VscFolderOpened,
	type: 'object',
	fields: [
		defineField({
			name: 'mainLabel',
			type: 'string',
		}),
		defineField({
			name: 'LinkLabel',
			type: 'string',
		}),
		defineField({
			name: 'links',
			type: 'array',
			of: [{ type: 'link' }],
		}),
		defineField({
			name: 'image',
			type: 'object',
			options: {
				columns: 3,
			},
			fields: [
				defineField({
					name: 'default',
					type: 'image',
				}),
				defineField({
					name: 'light',
					type: 'image',
				}),
				defineField({
					name: 'dark',
					type: 'image',
				}),
			],
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
