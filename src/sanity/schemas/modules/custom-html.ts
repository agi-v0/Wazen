import { VscCode } from 'react-icons/vsc'

export default {
	name: 'custom-html',
	title: 'Custom HTML',
	icon: VscCode,
	type: 'object',
	fields: [
		{
			name: 'html',
			title: 'HTML',
			type: 'text',
			rows: 10,
		},
	],
}
