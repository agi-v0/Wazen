import { getBlockText } from '../../src/utils'
import { VscEdit } from 'react-icons/vsc'

export default {
	name: 'contact-us',
	title: 'Contact Us',
	icon: VscEdit,
	type: 'object',
	fields: [
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		},
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'contactInfo',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'title',
							type: 'array',
							of: [{ type: 'block' }],
						},
						{
							name: 'link',
							type: 'link',
						},
					],
					preview: {
						select: {
							contactInfo: 'title',
						},
						prepare: ({ contactInfo }: any) => ({
							title: getBlockText(contactInfo),
							subtitle: 'Contact Info',
						}),
					},
				},
			],
		},
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }: any) => ({
			title: getBlockText(content),
			subtitle: 'Contact Us',
		}),
	},
}
