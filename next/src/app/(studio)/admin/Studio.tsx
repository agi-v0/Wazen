'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@sanity/sanity.config'

// const config = {
// 	name: 'default',
// 	title: 'Wazen',
// 	projectId: 'm7bjawr3',
// 	dataset: 'production',
// 	basePath: '/admin',
// }

export function Studio() {
	return <NextStudio config={config} />
}
