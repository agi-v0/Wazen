import { group, singleton } from './utils'
import type { StructureResolver } from 'sanity/structure'

import { VscServerProcess } from 'react-icons/vsc'
import { BsDatabaseAdd } from 'react-icons/bs'

const structure: StructureResolver = (S, context) =>
	S.list()
		.title('Content')
		.items([
			singleton(S, 'Site', 'site').icon(VscServerProcess),
			S.documentTypeListItem('navigation'),
			S.documentTypeListItem('redirect').title('Redirects'),
			S.divider(),

			S.documentTypeListItem('page').title('Pages'),
			S.divider(),

			S.documentTypeListItem('blog.post').title('Blog posts (عربي)'),
			S.documentTypeListItem('blog.post.en').title('Blog posts (English)'),
			S.documentTypeListItem('blog.category').title('Blog categories'),
			S.divider(),

			S.documentTypeListItem('app.store.app').title('App store apps'),
			S.divider(),

			group(S, 'Miscellaneous', [
				S.documentTypeListItem('logo').title('Logos'),
				S.documentTypeListItem('partnerslogos').title('Partners Logos'),
				S.documentTypeListItem('pricing').title('Pricing Tier'),
				S.documentTypeListItem('testimonial').title('Testimonials'),
				S.documentTypeListItem('faq').title('FAQ'),
				S.documentTypeListItem('help.center.category').title('Help Center Categories'),
			]).icon(BsDatabaseAdd),
		])

export default structure
