import { defineField, defineType } from 'sanity'
import { MediaEditor } from '@catherineriver/sanity-plugin-generate-ogimage'
import { OGImageEditor } from '../../src/OGImageEditor'
import React from 'react'

export default defineType({
	name: 'metadata',
	title: 'Metadata',
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.max(60).warning(),
		}),
		defineField({
			name: 'description',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.max(160).warning(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: (doc: any) => doc.name || doc.title,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'image',
			description: 'Used for social sharing previews',
			type: 'image',
			options: {
				sources: [
					{
						name: 'generate-ogimage',
						title: 'Generate Image',
						component: (props) => (
							<MediaEditor {...props} layouts={[OGImageEditor]} />
						),
					},
				],
			},
		}),
		defineField({
			name: 'noIndex',
			description: 'Prevent search engines from indexing this page.',
			type: 'boolean',
			initialValue: false,
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
		},
	},
})
