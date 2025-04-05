import { getBlockText } from '../../src/utils'
import { VscSymbolMisc } from 'react-icons/vsc'

export default {
	name: 'steps',
	title: 'Steps',
	icon: VscSymbolMisc,
	type: 'object',
	fields: [
		{
			name: 'mainTitle',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'content1',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'content2',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'content3',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'image1',
			type: 'image',
		},
		{
			name: 'image2',
			type: 'image',
		},
		{
			name: 'image3',
			type: 'image',
		},
	],
	preview: {
		select: {
			content: 'content',
			subtitle: 'subtitle',
		},
		prepare: ({ content, subtitle }: any) => ({
			title: subtitle || getBlockText(content),
			subtitle: 'Steps',
		}),
	},
}
