/**
 * Slugify utility that handles both Arabic and English text
 * Converts text into URL-friendly slugs while preserving Arabic characters
 */

export interface SlugifyOptions {
	/**
	 * Maximum length of the slug
	 * @default 100
	 */
	maxLength?: number

	/**
	 * Custom separator instead of hyphen
	 * @default '-'
	 */
	separator?: string
}

/**
 * Convert text to URL-friendly slug
 * Handles both Arabic and English text, preserving Arabic characters
 */
export function slugify(text: string, options: SlugifyOptions = {}): string {
	const { maxLength = 100, separator = '-' } = options

	if (!text) return ''

	let slug = text.trim()

	// Normalize the text
	slug = slug.normalize('NFD')

	// Convert Latin characters to lowercase
	slug = slug.replace(/[a-zA-Z]/g, (char) => char.toLowerCase())

	// Remove diacritics from Latin characters only
	slug = slug.replace(/[\u0300-\u036f]/g, '')

	// Replace spaces, underscores, and multiple separators with single separator
	slug = slug.replace(/[\s_]+/g, separator)

	// Remove special characters but keep Arabic, Latin alphanumeric, and separators
	// Arabic ranges: \u0600-\u06FF (main), \u0750-\u077F (supplement), \u08A0-\u08FF (extended),
	// \uFB50-\uFDFF (presentation forms A), \uFE70-\uFEFF (presentation forms B)
	slug = slug.replace(
		/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\w\-]/g,
		'',
	)

	// Remove multiple consecutive separators
	slug = slug.replace(new RegExp(`\\${separator}+`, 'g'), separator)

	// Remove separators from start and end
	slug = slug.replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), '')

	// Limit length
	if (slug.length > maxLength) {
		slug = slug.substring(0, maxLength)
		// Make sure we don't cut in the middle of a word
		const lastSeparator = slug.lastIndexOf(separator)
		if (lastSeparator > maxLength * 0.8) {
			slug = slug.substring(0, lastSeparator)
		}
	}

	// Fallback for empty slugs
	if (!slug) {
		slug = 'untitled'
	}

	return slug
}

export default slugify
