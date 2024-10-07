import { defineField, defineType } from 'sanity'
import { VscInspect } from 'react-icons/vsc'
import { getBlockText } from '../../src/utils'

export default defineType({
	name: 'cta',
	title: 'Call-to-action',
	icon: VscInspect,
	type: 'object',
	fields: [
		defineField({
			name: 'link',
			type: 'link',
		}),
		defineField({
			name: 'style',
			type: 'string',
			options: {
				list: [
					{ title: 'Primary', value: 'primary' },
					{ title: 'Secondary', value: 'secondary' },
					{ title: 'Tertiary', value: 'tertiary' },
				],
			},
		}),
	],
	preview: {
		select: {
			title: 'link.label',
			internal: 'link.internal.metadata.slug.current',
			external: 'link.external',
		},
		prepare: ({ title, internal, external }) => ({
			title: title,
			subtitle:
				external || (internal && (internal === 'index' ? '/' : `/${internal}`)),
		}),
	},
})
