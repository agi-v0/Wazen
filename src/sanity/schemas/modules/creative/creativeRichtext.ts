import { getBlockText } from '../../../src/utils'
import { VscSymbolKeyword } from 'react-icons/vsc'

export default {
	name: 'richtext',
	icon: VscSymbolKeyword,
	type: 'object',
	fields: [
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		},
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }: any) => ({
			title: getBlockText(content),
			subtitle: 'Richtext',
		}),
	},
}
