import { createClient } from 'next-sanity'
import groq from 'groq'
import withPlugins from 'next-compose-plugins'

import createNextIntlPlugin from 'next-intl/plugin'
import withBundleAnalyzer from '@next/bundle-analyzer'
const withNextIntl = createNextIntlPlugin()

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	apiVersion: '2024-04-01',
	useCdn: true,
})

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
		],
	},

	async redirects() {
		const redirects = await client.fetch(groq`*[_type == 'redirect']`)
		return redirects?.map(({ source, destination, permanent }) => ({
			source: '/' + encodeURIComponent(source),
			destination,
			permanent,
		}))
	},

	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
	experimental: {
		optimizePackageImports: ['react-icons/*', '@sanity/visual-editing'],
	},
}

export default withPlugins([withNextIntl, [bundleAnalyzer]], nextConfig)
