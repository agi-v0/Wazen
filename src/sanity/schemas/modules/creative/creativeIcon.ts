import { VscVerified } from 'react-icons/vsc'

export default {
	name: 'icon',
	icon: VscVerified,
	type: 'object',
	fields: [
		{
			name: 'icon',
			type: 'image',
		},
		{
			name: 'height',
			type: 'number',
			description: 'px',
			validation: (rule: any) => rule.min(1).integer(),
			initialValue: 60,
		},
	],
	preview: {
		select: {
			media: 'icon',
		},
	},
}
