import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

interface ExtendedArrayOptions<T> {
	advanced?: {
		select?: boolean
	}
}

export default {
	name: 'applications',
	title: 'Applications',
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
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		},
		{
			name: 'chips',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'icon',
							title: 'Icon (Phosphor icons)',
							description: `Go to https://phosphoricons.com/ and find the icon of your choice. Copy it's name and paste it here to look it up.`,
							type: 'icon',
						},
						{
							name: 'image',
							title: 'Image',
							type: 'image',
						},
						{
							name: 'title',
							type: 'string',
						},
						{
							name: 'description',
							type: 'text',
						},
						{
							name: 'link',
							type: 'link',
						},
					],
					preview: {
						select: {
							card: 'title',
							description: 'description',
							image: 'image',
						},
						prepare: ({ card, description, image }: any) => ({
							title: card,
							subtitle: description,
							media: image,
						}),
					},
				},
			],
			options: {
				advanced: {
					select: true,
				},
			} as ExtendedArrayOptions<unknown>,
		},
		{
			name: 'altAppsLogos',
			title: 'Competitor logos',
			type: 'array',
			of: [
				{
					type: 'image',
				},
			],
		},
		{
			name: 'comparisonTable',
			type: 'table',
		},
	],
	preview: {
		select: {
			pretitle: 'pretitle',
			content: 'content',
			media: 'image',
		},
		prepare: ({ pretitle, content, media }: any) => ({
			title: getBlockText(content),
			subtitle: 'Applications',
			media,
		}),
	},
}
