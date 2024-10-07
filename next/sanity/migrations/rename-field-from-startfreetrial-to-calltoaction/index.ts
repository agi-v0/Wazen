import { defineMigration, at, setIfMissing, unset } from 'sanity/migrate'

const from = 'start.free.trial'
const to = 'call.to.action'

export default defineMigration({
	title: 'Rename field from CallToAction to calltoaction',
	documentTypes: ['page'],

	migrate: {
		document(doc, context) {
			return [at(to, setIfMissing(doc[from])), at(from, unset())]
		},
	},
})
