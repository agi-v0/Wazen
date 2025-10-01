import { groq } from 'next-sanity'
import { defineMigration, patch, at, set } from 'sanity/migrate'

export default defineMigration({
	title: 'add cta block to posts',
	documentTypes: ['blog.post', 'blog.post.en'],

	async *migrate(documents, context) {
		// Fetch the default CTA document data within the Page component
		const locales = ['ar', 'en']
		const [ctaDocDataAr, ctaDocDataEn] = await Promise.all(
			locales.map((locale) =>
				context.client.fetch<Sanity.CallToActionDoc>(
					groq`*[_type == 'call.to.action.doc' && language == $locale][0]{_id}`,
					{ locale },
				),
			),
		)

		for await (const document of documents()) {
			yield patch(document._id, [
				at(
					'callToAction',
					set({
						_type: 'reference',
						_ref:
							document._type === 'blog.post'
								? ctaDocDataAr._id
								: ctaDocDataEn._id,
					}),
				),
			])
		}
	},
})
