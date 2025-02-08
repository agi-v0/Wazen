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

			S.documentTypeListItem('blog.post').title('Blog posts'),
			S.documentTypeListItem('blog.category').title('Blog categories'),
			S.divider(),

			S.documentTypeListItem('help.center.post').title('Help center posts'),
			S.documentTypeListItem('help.center.category').title(
				'Help Center Categories',
			),
			S.divider(),

			S.documentTypeListItem('app.store.app').title('Integrations'),
			S.divider(),

			group(S, 'Global modules', [
				S.documentTypeListItem('logo').title('Logos'),
				S.documentTypeListItem('partners.logos').title('Partners logos'),
				S.documentTypeListItem('pricing').title('Pricing Tier'),
				S.documentTypeListItem('testimonial').title('Testimonials'),
				S.documentTypeListItem('faq').title('FAQ'),
				S.documentTypeListItem('call.to.action.doc').title('Call to Action'),
			]).icon(BsDatabaseAdd),
		])

export default structure
