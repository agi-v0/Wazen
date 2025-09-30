import { VscInspect } from 'react-icons/vsc'
import { getBlockText } from '../../src/utils'

export default {
	name: 'cta',
	title: 'Call-to-action',
	icon: VscInspect,
	type: 'object',
	fields: [
		{
			name: 'link',
			type: 'link',
		},
		{
			name: 'style',
			type: 'string',
			options: {
				list: [
					{ title: 'Primary', value: 'primary' },
					{ title: 'Secondary', value: 'secondary' },
					{ title: 'Tertiary', value: 'tertiary' },
				],
			},
		},
	],
	preview: {
		select: {
			title: 'link.label',
			internal: 'link.internal.metadata.slug.current',
			external: 'link.external',
		},
		prepare: ({ title, internal, external }: any) => ({
			title: title,
			subtitle:
				external || (internal && (internal === 'index' ? '/' : `/${internal}`)),
		}),
	},
}
