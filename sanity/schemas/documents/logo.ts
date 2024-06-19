import { defineField, defineType } from 'sanity'
import { VscSymbolMisc } from 'react-icons/vsc'
import { InlineSvgPreviewItem } from '@focus-reactive/sanity-plugin-inline-svg-input'

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
			type: 'inlineSvg',
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
