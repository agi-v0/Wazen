import { isDev } from 'sanity'

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID!

export const dataset = process.env.SANITY_STUDIO_DATASET

export const BASE_URL = isDev
	? 'http://localhost:3000'
	: process.env.SANITY_STUDIO_PREVIEW_URL
