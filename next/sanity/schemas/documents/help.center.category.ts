import { defineField, defineType } from 'sanity'
import { VscTag } from 'react-icons/vsc'

export default defineType({
	name: 'help.center.category',
	title: 'Help Center Category',
	type: 'document',
	icon: VscTag,
	fields: [
		defineField({
			name: 'title',
			title: 'Title (عربي)',
			type: 'string',
		}),
		defineField({
			name: 'title_en',
			title: 'Title (English)',
			type: 'string',
		}),
	],
})
