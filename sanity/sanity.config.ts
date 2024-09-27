import { defineConfig } from 'sanity'
import { BASE_URL, projectId, dataset } from './src/env'
import { structureTool } from 'sanity/structure'
import structure from './src/structure'
import defaultDocumentNode from './src/defaultDocumentNode'
import { presentationTool } from 'sanity/presentation'
import {
	dashboardTool,
	projectInfoWidget,
	projectUsersWidget,
} from '@sanity/dashboard'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

import { documentInternationalization } from '@sanity/document-internationalization'
import { inlineSvgInput } from '@focus-reactive/sanity-plugin-inline-svg-input'
import { iconify } from 'sanity-plugin-iconify'
import { advancedArray } from './plugins/sanity-plugin-advanced-array'
import { table } from '@sanity/table'
import Logo from './static/wazen-logo'

const singletonTypes = ['site']

export default defineConfig({
	name: 'default',
	title: 'Wazen',
	icon: Logo,
	projectId: 'm7bjawr3',
	dataset: 'production',
	basePath: '/admin',

	plugins: [
		structureTool({
			title: 'Content',
			defaultDocumentNode,
			structure,
		}),
		presentationTool({
			title: 'Editor',
			previewUrl: {
				draftMode: {
					enable: `${BASE_URL}/api/draft`,
				},
			},
		}),
		dashboardTool({
			title: 'Deployment',
			widgets: [projectInfoWidget(), projectUsersWidget()],
		}),
		visionTool({
			title: 'GROQ',
		}),
		documentInternationalization({
			// Required configuration
			supportedLanguages: [
				{ id: 'ar', title: 'Arabic' },
				{ id: 'en', title: 'English' },
			],
			schemaTypes: [
				'site',
				'navigation',
				'page',
				'app.store.app',
				'call.to.action.doc',
			],
		}),
		inlineSvgInput(),
		iconify({
			collections: ['ph'],
		}),
		advancedArray(),
		table(),
	],

	tasks: { enabled: false },
	scheduledPublishing: {
		enabled: false,
	},

	schema: {
		types: schemaTypes,
		templates: (templates) =>
			templates.filter(
				({ schemaType }) => !singletonTypes.includes(schemaType),
			),
	},

	document: {
		actions: (input, { schemaType }) =>
			singletonTypes.includes(schemaType)
				? input.filter(
						({ action }) =>
							action &&
							['publish', 'discardChanges', 'restore'].includes(action),
					)
				: input,
	},
})
