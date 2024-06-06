import { defineField, defineType } from 'sanity'
import { VscSymbolMisc } from 'react-icons/vsc'

export default defineType({
	name: 'partnerslogos',
	title: 'Partners Logos',
	icon: VscSymbolMisc,
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			type: 'string',
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
			title: 'name',
			media: 'image.default',
		},
		prepare: ({ title, media }) => ({
			title,
			subtitle: 'Partners Logos',
			media,
		}),
	},
})
