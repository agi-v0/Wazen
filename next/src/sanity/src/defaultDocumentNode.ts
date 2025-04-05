import { Iframe } from 'sanity-plugin-iframe-pane'
import { BASE_URL } from './env'
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
		case 'blog.post':
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
							},
						) => {
							const slug = doc?.metadata?.slug?.current
							const path = slug === 'index' ? '' : slug
							const directory = schemaType === 'blog.post' ? 'blog' : null

							return [BASE_URL, directory, path].filter(Boolean).join('/')
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
