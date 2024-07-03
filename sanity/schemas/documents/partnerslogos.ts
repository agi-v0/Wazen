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
		{
			name: 'icon',
			type: 'inlineSvg',
		},
	],
	preview: {
		select: {
			title: 'name',
		},
		prepare: ({ title }) => ({
			title,
			subtitle: 'Partner logo',
		}),
	},
})
