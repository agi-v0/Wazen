import { VscInspect } from 'react-icons/vsc'
import { count } from '../../../src/utils'

export default {
	name: 'ctas',
	title: 'Call-to-actions',
	icon: VscInspect,
	type: 'object',
	fields: [
		{
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		},
	],
	preview: {
		select: {
			ctas: 'ctas',
		},
		prepare: ({ ctas }: any) => ({
			title: count(ctas, 'CTA'),
		}),
	},
}
