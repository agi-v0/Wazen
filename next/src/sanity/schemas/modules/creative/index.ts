import creativeCtas from './creativeCtas'
import creativeIcon from './creativeIcon'
import creativeImage from './creativeImage'
import creativeRichtext from './creativeRichtext'
import { count, getBlockText } from '../../../src/utils'

import { VscExtensions } from 'react-icons/vsc'

export default {
	name: 'creative-module',
	title: 'Creative module',
	icon: VscExtensions,
	type: 'object',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'options', title: 'Options' },
	],
	fieldsets: [
		{ name: 'alignment', title: 'Alignment', options: { columns: 2 } },
	],
	fields: [
		{
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		},
		{
			name: 'modules',
			type: 'array',
			of: [
				{
					title: 'module',
					type: 'object',
					fields: [
						{
							name: 'subModules',
							type: 'array',
							of: [
								creativeCtas,
								creativeIcon,
								creativeImage,
								creativeRichtext,
								{ type: 'custom-html' },
							],
						},
						{
							name: 'colSpan',
							title: 'Column span',
							type: 'number',
							validation: (rule: any) => rule.min(1).integer(),
						},
					],
					preview: {
						select: {
							subModules: 'subModules',
						},
						prepare: ({ subModules }: any) => {
							return {
								title: subModules
									.map(
										(subModule: any) =>
											subModule.title || subModule.name || subModule._type,
									)
									.filter(Boolean)
									.join(' + '),
							}
						},
					},
				},
			],
			group: 'content',
		},
		{
			name: 'columns',
			type: 'number',
			description: 'Leave empty to use the number of modules as columns',
			validation: (rule: any) => rule.min(1).integer(),
			group: 'options',
		},
		{
			name: 'textAlign',
			type: 'string',
			options: {
				list: ['left', 'center', 'right'],
			},
			initialValue: 'left',
			group: 'options',
			fieldset: 'alignment',
		},
		{
			name: 'alignItems',
			title: 'Vertical alignment',
			type: 'string',
			options: {
				list: [
					{ title: 'Top', value: 'start' },
					'center',
					{ title: 'Bottom', value: 'end' },
				],
			},
			initialValue: 'center',
			group: 'options',
			fieldset: 'alignment',
		},
	],
	preview: {
		select: {
			content: 'content',
			modules: 'modules',
		},
		prepare: ({ content, modules }: any) => ({
			title: getBlockText(content),
			subtitle: count(modules, 'module'),
		}),
	},
}
