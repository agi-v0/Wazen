import { defineMigration, at, set } from 'sanity/migrate'
import slugify from '@/lib/slugify'

export default defineMigration({
	title:
		'Add and populate slug field for blog categories based on English title',
	documentTypes: ['blog.category'],

	migrate: {
		document(doc: any) {
			// Skip if slug already exists or no English title
			if (doc.slug?.current || !doc.title?.en) {
				return []
			}

			const englishTitle = doc.title.en
			const slugged = slugify(englishTitle)

			return [
				at(
					'slug',
					set({
						_type: 'slug',
						current: slugged,
					}),
				),
			]
		},
	},
})
