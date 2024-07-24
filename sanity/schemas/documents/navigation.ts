import { defineField, defineType } from 'sanity'
import { VscSymbolClass } from 'react-icons/vsc'
import { count } from '../../src/utils'

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
			},
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
