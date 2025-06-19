import { defineMigration, at, set, unset } from 'sanity/migrate'
import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

async function translateToEnglish(arabicText: string): Promise<string> {
	try {
		const { text } = await generateText({
			model: google('gemini-2.5-flash'),
			prompt: `Translate the following Arabic text to English. Only return the translation, no additional text or explanation: "${arabicText}"`,
		})
		return text.trim()
	} catch (error) {
		console.error('Translation failed for:', arabicText, error)
		// Return empty string if translation fails
		return ''
	}
}

export default defineMigration({
	title:
		'Migrate blog.category title fields to localized object structure with AI translation',
	documentTypes: ['blog.category'],

	migrate: {
		async document(doc, context) {
			// Skip if the document doesn't have the old fields or already has the new structure
			if (!doc.title && !doc.title_en) {
				return []
			}

			// Skip if title is already an object (migration already applied)
			if (typeof doc.title === 'object' && doc.title !== null) {
				return []
			}

			// Get the Arabic title and existing English title
			const arabicTitle = (typeof doc.title === 'string' ? doc.title : '') || ''
			const existingEnglishTitle = doc.title_en || ''

			// Translate Arabic to English if no English title exists
			let englishTitle = existingEnglishTitle
			if (!existingEnglishTitle && arabicTitle) {
				console.log(`Translating: "${arabicTitle}"`)
				englishTitle = await translateToEnglish(arabicTitle)
				console.log(`Translation result: "${englishTitle}"`)
			}

			// Create the new localized title object
			const localizedTitle = {
				ar: arabicTitle, // Arabic (default language)
				en: englishTitle, // English (translated or existing)
			}

			// Return the migration operations
			return [
				// Set the new localized title object (overwrite existing title)
				at('title', set(localizedTitle)),
				// Remove the old title_en field
				at('title_en', unset()),
			]
		},
	},
})
