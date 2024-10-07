import { defineField, defineType } from 'sanity'
import { VscSymbolClass } from 'react-icons/vsc'
import { count } from '../../src/utils'
import { ArrayOptions } from 'sanity'

interface ExtendedArrayOptions<T> extends ArrayOptions<T> {
	advanced?: {
		select?: boolean
	}
}

export default defineType({
	name: 'navigation',
	title: 'Navigation',
	icon: VscSymbolClass,
	type: 'document',
	fields: [
		defineField({
			// should match 'languageField' plugin configuration setting, if customized
			name: 'language',
			type: 'string',
			readOnly: true,
			hidden: true,
		}),
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'items',
			type: 'array',
			of: [{ type: 'link' }, { type: 'link.list' }, { type: 'link.group' }],
			options: {
				advanced: {
					select: true,
				},
			} as ExtendedArrayOptions<unknown>,
		}),
	],
	preview: {
		select: {
			title: 'title',
			items: 'items',
		},
		prepare: ({ title, items }) => ({
			title,
			subtitle: count(items),
		}),
	},
})
