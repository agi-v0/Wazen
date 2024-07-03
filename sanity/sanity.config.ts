import { defineConfig } from 'sanity'
import { BASE_URL, projectId } from './src/env'
import { structureTool } from 'sanity/structure'
import defaultDocumentNode from './src/defaultDocumentNode'
import structure from './src/structure'
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

const singletonTypes = ['site']

export default defineConfig({
	name: 'default',
	title: 'Wazen',

	projectId: 'm7bjawr3',
	dataset: 'production',

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
			schemaTypes: ['page', 'site', 'navigation'],
		}),
		inlineSvgInput(),
		iconify({
			collections: ['ph'],
		}),
		advancedArray(),
	],

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
