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
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'link',
			type: 'link',
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
			title: 'title',
			link: 'link.label',
		},
		prepare: ({ title, link }) => ({
			title: title,
			subtitle: link,
		}),
	},
})
