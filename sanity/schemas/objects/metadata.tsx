import { SlugValidationContext, defineField, defineType } from 'sanity'
// import { MediaEditor } from '@catherineriver/sanity-plugin-generate-ogimage'
import { OGImageEditor } from '../../src/OGImageEditor'
import React from 'react'
import { MediaEditor } from '../../plugins/sanity-plugin-generate-og-image/src'

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
				isUnique: isUniqueOtherThanLanguage,
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
						name: 'sharing-ogimage',
						title: 'Generate Image',
						component: (props: any) => (
							<MediaEditor {...props} layouts={[OGImageEditor as any]} />
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
export async function isUniqueOtherThanLanguage(
	slug: string,
	context: SlugValidationContext,
) {
	const { document, getClient } = context
	if (!document?.language) {
		return true
	}
	const client = getClient({ apiVersion: '2023-04-24' })
	const id = document._id.replace(/^drafts\./, '')
	const params = {
		draft: `drafts.${id}`,
		published: id,
		language: document.language,
		slug,
	}
	const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`
	const result = await client.fetch(query, params)
	return result
}
