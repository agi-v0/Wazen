import { defineField, defineType } from 'sanity'
import { VscSymbolMisc } from 'react-icons/vsc'

export default defineType({
	name: 'logo',
	title: 'Logo',
	icon: VscSymbolMisc,
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			type: 'string',
		}),
		{
			name: 'icon',
			type: 'image',
		},
	],
	preview: {
		select: {
			title: 'name',
		},
		prepare: ({ title }) => ({
			title,
			subtitle: 'Logo',
		}),
	},
})
