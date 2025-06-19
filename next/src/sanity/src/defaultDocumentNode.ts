import { Iframe } from 'sanity-plugin-iframe-pane'
import { BASE_URL } from '../../lib/env'
import { VscEdit, VscEye } from 'react-icons/vsc'
import type { DefaultDocumentNodeResolver } from 'sanity/structure'
import { SanityDocumentStub } from 'next-sanity'

const defaultDocumentNode: DefaultDocumentNodeResolver = (
	S,
	{ schemaType },
) => {
	const editorView = S.view.form().icon(VscEdit)

	switch (schemaType) {
		case 'page':
		case 'app.store.app':
		case 'blog.post':
		case 'blog.post.en':
			return S.document().views([
				editorView,
				S.view
					.component(Iframe)
					.title('Preview')
					.icon(VscEye)
					.options({
						url: (
							doc: SanityDocumentStub & {
								metadata?: { slug?: { current: string } }
								language?: string
							},
						) => {
							const slug = doc?.metadata?.slug?.current
							const path = slug === 'index' ? '' : slug
							let directory = null
							// const directory = schemaType === 'blog.post' ? 'blog' : null
							switch (schemaType) {
								case 'blog.post':
									directory = 'blog'
								case 'blog.post.en':
									directory = 'blog'
								case 'app.store.app':
									directory = 'integrations'
							}

							return [BASE_URL, doc?.language, directory, path]
								.filter(Boolean)
								.join('/')
						},
						reload: {
							button: true,
						},
					}),
			])

		default:
			return S.document().views([editorView])
	}
}

export default defaultDocumentNode
