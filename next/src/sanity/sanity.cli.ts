import { defineCliConfig } from 'sanity/cli'
import { BASE_URL, projectId, dataset } from './src/env'

export default defineCliConfig({
	api: {
		projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
		dataset,
	},
})
