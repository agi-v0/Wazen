import { VscSymbolClass } from 'react-icons/vsc'
import { count } from '../../src/utils'

interface ExtendedArrayOptions<T> {
	advanced?: {
		select?: boolean
	}
}

export default {
	name: 'navigation',
	title: 'Navigation',
	icon: VscSymbolClass,
	type: 'document',
	fields: [
		{
			// should match 'languageField' plugin configuration setting, if customized
			name: 'language',
			type: 'string',
			readOnly: true,
			hidden: true,
		},
		{
			name: 'title',
			type: 'string',
			validation: (rule: any) => rule.required(),
		},
		{
			name: 'items',
			type: 'array',
			of: [{ type: 'link' }, { type: 'link.list' }, { type: 'link.group' }],
			options: {
				advanced: {
					select: true,
				},
			} as ExtendedArrayOptions<unknown>,
		},
	],
	preview: {
		select: {
			title: 'title',
			items: 'items',
		},
		prepare: ({ title, items }: any) => ({
			title,
			subtitle: count(items),
		}),
	},
}
