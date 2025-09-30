import { VscSymbolKeyword } from 'react-icons/vsc'
import { IoIosImage } from 'react-icons/io'
import { getBlockText } from '../../src/utils'

export default {
	name: 'richtext-module',
	title: 'Richtext module',
	icon: VscSymbolKeyword,
	type: 'object',
	fields: [
		{
			name: 'content',
			type: 'array',
			of: [
				{ type: 'block' },
				{
					type: 'image',
					icon: IoIosImage,
					fields: [
						{
							name: 'alt',
							type: 'string',
						},
						{
							name: 'caption',
							type: 'text',
							rows: 2,
						},
					],
				},
			],
		},
		{
			name: 'contents',
			type: 'boolean',
			initialValue: false,
		},
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }: any) => ({
			title: getBlockText(content),
			subtitle: 'Richtext module',
		}),
	},
}
