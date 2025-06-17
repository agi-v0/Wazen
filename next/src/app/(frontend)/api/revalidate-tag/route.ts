import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = {
	_type: string
	slug?: {
		current: string
	}
	metadata?: {
		slug?: {
			current: string
		}
	}
	language?: 'en' | 'ar'
	_id?: string
}

export async function POST(req: NextRequest) {
	try {
		if (!process.env.SANITY_REVALIDATE_SECRET) {
			return new Response(
				'Missing environment variable SANITY_REVALIDATE_SECRET',
				{ status: 500 },
			)
		}

		const { isValidSignature, body } = await parseBody<WebhookPayload>(
			req,
			process.env.SANITY_REVALIDATE_SECRET,
		)

		if (!body) {
			return new Response('Bad Request', { status: 400 })
		}

		if (!isValidSignature) {
			return new Response(JSON.stringify({ message: 'Invalid signature' }), {
				status: 401,
			})
		}

		const pathsToRevalidate: string[] = []

		// Handle different document types
		switch (body._type) {
			case 'page': {
				const slug = body.metadata?.slug?.current
				const language = body.language || 'en'

				if (slug === 'index') {
					pathsToRevalidate.push(`/${language}`)
				} else if (slug) {
					pathsToRevalidate.push(`/${language}/${slug}`)
				}
				break
			}

			case 'blog.post':
			case 'blog.post.en': {
				const slug = body.metadata?.slug?.current
				const language = body.language || 'en'

				if (slug) {
					pathsToRevalidate.push(`/${language}/blog/${slug}`)
					// Also revalidate blog listing pages
					pathsToRevalidate.push(`/${language}/blog`)
				}
				break
			}

			case 'app.store.app': {
				const slug = body.metadata?.slug?.current
				const language = body.language || 'en'

				if (slug) {
					pathsToRevalidate.push(`/${language}/integrations/${slug}`)
					// Also revalidate integrations listing
					pathsToRevalidate.push(`/${language}/integrations`)
				}
				break
			}

			case 'help.center.post': {
				const slug = body.metadata?.slug?.current
				const language = body.language || 'en'

				if (slug) {
					pathsToRevalidate.push(`/${language}/help-center/${slug}`)
					pathsToRevalidate.push(`/${language}/help-center`)
				}
				break
			}

			default:
				// For other document types, revalidate homepage
				pathsToRevalidate.push('/en', '/ar')
		}

		// Revalidate all affected paths
		const revalidationResults = []
		for (const path of pathsToRevalidate) {
			try {
				revalidatePath(path)
				revalidationResults.push({ path, status: 'success' })
			} catch (error) {
				revalidationResults.push({
					path,
					status: 'error',
					error: error instanceof Error ? error.message : 'Unknown error',
				})
			}
		}

		return NextResponse.json({
			message: 'Revalidation completed',
			revalidated: revalidationResults,
			document: {
				_type: body._type,
				_id: body._id,
			},
		})
	} catch (err) {
		console.error('Revalidation webhook error:', err)
		return new Response(err instanceof Error ? err.message : 'Unknown error', {
			status: 500,
		})
	}
}
