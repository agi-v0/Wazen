const { createClient } = require('next-sanity')
const groq = require('groq')
const withPlugins = require('next-compose-plugins')

const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin()

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	apiVersion: '2024-04-01',
	useCdn: true,
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
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
		optimizePackageImports: ['react-icons/pi/*'],
	},
}

module.exports = withPlugins([withNextIntl, [withBundleAnalyzer]], nextConfig)
