import { defineCliConfig } from 'sanity/cli'
import { projectId } from './src/env'

export default defineCliConfig({
	api: {
		projectId: 'm7bjawr3',
		dataset: 'testing',
	},
	studioHost: 'wazen-dev',
})
