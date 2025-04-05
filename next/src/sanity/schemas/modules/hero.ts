import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'hero',
	title: 'Hero 1',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	fields: [
		{
			name: 'pretitle',
			type: 'string',
		},
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'image',
			type: 'image',
			fields: [
				{
					name: 'alt',
					type: 'string',
				},
			],
		},
		{
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		},
	],
	preview: {
		select: {
			content: 'content',
			media: 'image',
		},
		prepare: ({ content, media }: any) => ({
			title: getBlockText(content),
			subtitle: 'Hero',
			media,
		}),
	},
}
