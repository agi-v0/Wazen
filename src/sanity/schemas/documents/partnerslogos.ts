import { VscSymbolMisc } from 'react-icons/vsc'

export default {
	name: 'partners.logos',
	title: 'Partners Logos',
	icon: VscSymbolMisc,
	type: 'document',
	fields: [
		{
			name: 'name',
			type: 'string',
		},
		{
			name: 'icon',
			type: 'image',
		},
	],
	preview: {
		select: {
			title: 'name',
		},
		prepare: ({ title }: any) => ({
			title,
			subtitle: 'Partner logo',
		}),
	},
}
