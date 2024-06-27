import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText, count } from '../../src/utils'

export default defineType({
	name: 'home-brief-group',
	title: 'Homepage Brief Group',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	fields: [
		defineField({
			name: 'briefs',
			type: 'array',
			of: [{ type: 'brief' }],
		}),
	],
	preview: {
		select: {
			title: 'briefs',
		},
		prepare: ({ title }) => ({
			title: count(title, 'brief'),
			subtitle: 'Homepage brief group',
		}),
	},
})
