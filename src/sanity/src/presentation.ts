'use client'

import { defineLocations, presentationTool } from 'sanity/presentation'
import { groq } from 'next-sanity'
import { BLOG_DIR, INTEGRATIONS_DIR, BASE_URL } from '../../lib/env'

export const presentation = presentationTool({
	name: 'editor',
	title: 'Editor',
	previewUrl: {
		previewMode: {
			enable: '/api/draft',
			disable: '/api/disable-draft',
		},
		origin: BASE_URL,
	},
	resolve: {
		mainDocuments: [
			{
				route: '/:locale',
				filter: groq`_type == 'page' && metadata.slug.current == 'index' && language == $locale`,
			},
			{
				route: '/:locale/:slug',
				filter: groq`_type == 'page' && metadata.slug.current == $slug && language == $locale`,
			},
			{
				route: `/:locale/${BLOG_DIR}/:slug`,
				filter: groq`_type == 'blog.post' && metadata.slug.current == $slug && language == $locale`,
			},
			{
				route: `/:locale/${INTEGRATIONS_DIR}/:slug`,
				filter: groq`_type == 'app.store.app' && metadata.slug.current == $slug && language == $locale`,
			},
		],
		locations: {
			site: defineLocations({
				select: {
					title: 'title',
					language: 'language',
				},
				message: 'This document is used on all pages',
				resolve: (doc) => ({
					locations: [
						{
							title: 'Home',
							href: `/${doc?.language}`,
						},
					],
				}),
			}),
			page: defineLocations({
				select: {
					title: 'title',
					metaTitle: 'metadata.title',
					slug: 'metadata.slug.current',
					language: 'language',
				},
				resolve: (doc) => ({
					locations: [
						{
							title: doc?.title || doc?.metaTitle || 'Untitled',
							href: doc?.slug
								? doc.slug === 'index'
									? `/${doc.language}`
									: `/${doc.language}/${doc.slug}`
								: `/${doc?.language}`,
						},
					],
				}),
			}),
			'blog.post': defineLocations({
				select: {
					title: 'metadata.title',
					slug: 'metadata.slug.current',
					language: 'language',
				},
				resolve: (doc) => ({
					locations: [
						{
							title: doc?.title || 'Untitled',
							href: doc?.slug
								? `/${doc?.language}/${BLOG_DIR}/${doc.slug}`
								: `/${doc?.language}/${BLOG_DIR}`,
						},
					],
				}),
			}),
			'blog.category': defineLocations({
				select: {
					title: 'title',
					slug: 'slug.current',
					language: 'language',
				},
				resolve: (doc) => ({
					locations: [
						{
							title: doc?.title || 'Untitled',
							href: doc?.slug
								? `/${doc?.language}/${BLOG_DIR}?category=${doc.slug}`
								: `/${doc?.language}/${BLOG_DIR}`,
						},
					],
				}),
			}),
			'app.store.app': defineLocations({
				select: {
					title: 'metadata.title',
					slug: 'metadata.slug.current',
					language: 'language',
				},
				resolve: (doc) => ({
					locations: [
						{
							title: doc?.title || 'Untitled',
							href: doc?.slug
								? `/${doc?.language}/${INTEGRATIONS_DIR}/${doc.slug}`
								: `/${doc?.language}/${INTEGRATIONS_DIR}`,
						},
					],
				}),
			}),
		},
	},
})
