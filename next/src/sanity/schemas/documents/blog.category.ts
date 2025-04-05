import { VscTag } from 'react-icons/vsc'

export default {
	name: 'blog.category',
	title: 'Blog category',
	type: 'document',
	icon: VscTag,
	fields: [
		{
			name: 'title',
			title: 'Title (عربي)',
			type: 'string',
		},
		{
			name: 'title_en',
			title: 'Title (English)',
			type: 'string',
		},
	],
}
