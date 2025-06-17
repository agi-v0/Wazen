import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = {
	_type: string
	_id: string
	slug?: string
	language?: 'en' | 'ar'
	oldSlug?: string
}

export async function POST(req: NextRequest) {
	try {
		if (!process.env.SANITY_REVALIDATE_SECRET) {
			return new Response('Missing SANITY_REVALIDATE_SECRET', { status: 500 })
		}

		const { isValidSignature, body } = await parseBody<WebhookPayload>(
			req,
			process.env.SANITY_REVALIDATE_SECRET.trim(),
		)

		// Debug logging for signature validation
		console.log('Signature validation result:', isValidSignature)
		console.log('Request body:', body)

		if (!body) {
			return new Response('Bad Request', { status: 400 })
		}

		if (!isValidSignature) {
			return new Response('Invalid signature', { status: 401 })
		}

		const pathsToRevalidate: string[] = []

		// Determine language based on document type and language field
		const getLanguage = (type: string, language?: string): string[] => {
			switch (type) {
				case 'blog.post':
					return ['ar']
				case 'blog.post.en':
					return ['en']
				default:
					return language ? [language] : ['en', 'ar'] // fallback to both languages
			}
		}

		const languages = getLanguage(body._type, body.language)

		// Handle different document types and generate paths
		for (const lang of languages) {
			switch (body._type) {
				case 'page':
					if (body.slug === 'index') {
						pathsToRevalidate.push(`/${lang}`)
					} else if (body.slug) {
						pathsToRevalidate.push(`/${lang}/${body.slug}`)
					}

					// Also revalidate old slug if it changed
					if (body.oldSlug && body.oldSlug !== body.slug) {
						if (body.oldSlug === 'index') {
							pathsToRevalidate.push(`/${lang}`)
						} else {
							pathsToRevalidate.push(`/${lang}/${body.oldSlug}`)
						}
					}
					break

				case 'blog.post':
				case 'blog.post.en':
					if (body.slug) {
						pathsToRevalidate.push(`/${lang}/blog/${body.slug}`)
						pathsToRevalidate.push(`/${lang}/blog`) // listing page
					}
					if (body.oldSlug && body.oldSlug !== body.slug) {
						pathsToRevalidate.push(`/${lang}/blog/${body.oldSlug}`)
					}
					break

				case 'app.store.app':
					if (body.slug) {
						pathsToRevalidate.push(`/${lang}/integrations/${body.slug}`)
						pathsToRevalidate.push(`/${lang}/integrations`) // listing page
					}
					if (body.oldSlug && body.oldSlug !== body.slug) {
						pathsToRevalidate.push(`/${lang}/integrations/${body.oldSlug}`)
					}
					break

				case 'help.center.post':
					if (body.slug) {
						pathsToRevalidate.push(`/${lang}/help-center/${body.slug}`)
						pathsToRevalidate.push(`/${lang}/help-center`) // listing page
					}
					if (body.oldSlug && body.oldSlug !== body.slug) {
						pathsToRevalidate.push(`/${lang}/help-center/${body.oldSlug}`)
					}
					break
			}
		}

		// Revalidate all paths
		const results = []
		for (const path of [...new Set(pathsToRevalidate)]) {
			// Remove duplicates
			try {
				revalidatePath(path)
				// Add logging to your fetch function
				console.log('Cache revalidated for path:', path)
				results.push({ path, status: 'success' })
			} catch (error) {
				results.push({
					path,
					status: 'error',
					error: error instanceof Error ? error.message : 'Unknown error',
				})
			}
		}

		return NextResponse.json({
			message: `Revalidated ${results.length} paths`,
			results,
			document: { _type: body._type, _id: body._id },
		})
	} catch (err) {
		console.error('Webhook error:', err)
		return new Response(err instanceof Error ? err.message : 'Unknown error', {
			status: 500,
		})
	}
}
