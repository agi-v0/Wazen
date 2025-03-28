import 'server-only'

export const token = process.env.NEXT_PUBLIC_SANITY_TOKEN

if (!token) {
	throw new Error('Missing NEXT_PUBLIC_SANITY_TOKEN')
}
