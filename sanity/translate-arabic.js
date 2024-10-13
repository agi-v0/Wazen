const fs = require('fs').promises
const path = require('path')
const { GoogleGenerativeAI } = require('@google/generative-ai')

// Initialize Google Generative AI with Gemini
const genAI = new GoogleGenerativeAI('AIzaSyANRlr3AJrWLW7zyVdI6ibfjvHpH8mupEY')
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })

// Regular expression to detect Arabic text
const arabicRegex = /[\u0600-\u06FF]/

// Function to check if text contains Arabic
function containsArabic(text) {
	return arabicRegex.test(text)
}

// Function to implement exponential backoff
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

// Function to translate a batch of texts from Arabic to English
async function translateBatch(texts, retries = 3, delay = 1000) {
	for (let i = 0; i < retries; i++) {
		try {
			const prompt = texts
				.map((text, index) => `${index + 1}. "${text}"`)
				.join('\n')
			const result = await model.generateContent(
				`Translate the following Arabic texts from the website of an Enterprise Resource Planning software provider to English. The text should be consistent with the style of marketing messages, but shouldn't feel cheap/repetitive. Focus on the benefits for the ERP system end user. Respond with the translated content only, there is no need for anything else. Also note that 'وازن' should be translated to 'Wazen'. Maintain the numbering in your response:\n\n${prompt}\n\nTranslations:`,
			)
			const response = await result.response
			const translations = response.text().trim().split('\n')
			return translations.map((t) =>
				t
					.replace(/^\d+\.\s*/, '')
					.replace(/^"(.*)"$/, '$1')
					.trim(),
			)
		} catch (error) {
			if (error.message.includes('429') && i < retries - 1) {
				console.log(
					`Rate limit reached. Retrying in ${delay / 1000} seconds...`,
				)
				await sleep(delay)
				delay *= 2 // Exponential backoff
			} else {
				throw error
			}
		}
	}
	throw new Error('Max retries reached. Unable to translate batch.')
}

// Function to process content and collect Arabic texts
function processContent(content) {
	const texts = []
	const positions = []

	function traverse(obj, path = []) {
		if (Array.isArray(obj)) {
			obj.forEach((item, index) => traverse(item, [...path, index]))
		} else if (typeof obj === 'object' && obj !== null) {
			Object.entries(obj).forEach(([key, value]) =>
				traverse(value, [...path, key]),
			)
		} else if (typeof obj === 'string' && containsArabic(obj)) {
			texts.push(obj)
			positions.push(path)
		}
	}

	traverse(content)
	return { texts, positions }
}

// Function to replace Arabic texts with translations
function replaceTranslations(content, translations, positions) {
	const result = JSON.parse(JSON.stringify(content)) // Deep clone the original content

	positions.forEach((position, index) => {
		let current = result
		for (let i = 0; i < position.length - 1; i++) {
			current = current[position[i]]
		}
		current[position[position.length - 1]] = translations[index]
	})

	return result
}

// Function to read JSON file
async function readJsonFile(filePath) {
	const data = await fs.readFile(filePath, 'utf8')
	return JSON.parse(data)
}

// Function to write JSON file
async function writeJsonFile(filePath, data) {
	await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
}

// Main function to translate JSON content
async function translateJsonContent(
	inputFilePath,
	outputFilePath,
	batchSize = 10,
) {
	try {
		console.log(`Reading file: ${inputFilePath}`)
		const jsonInput = await readJsonFile(inputFilePath)

		console.log('Processing content and collecting Arabic texts...')
		const { texts, positions } = processContent(jsonInput)

		console.log(`Found ${texts.length} Arabic texts. Translating in batches...`)
		const translations = []
		for (let i = 0; i < texts.length; i += batchSize) {
			const batch = texts.slice(i, i + batchSize)
			const batchTranslations = await translateBatch(batch)
			translations.push(...batchTranslations)
			console.log(
				`Translated batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(texts.length / batchSize)}`,
			)
		}

		console.log('Replacing Arabic texts with translations...')
		const translatedContent = replaceTranslations(
			jsonInput,
			translations,
			positions,
		)

		console.log(`Writing translated content to: ${outputFilePath}`)
		await writeJsonFile(outputFilePath, translatedContent)

		console.log('Translation complete!')
	} catch (error) {
		console.error('Error processing JSON:', error)
	}
}

// Check if input and output file paths are provided as command-line arguments
if (process.argv.length < 4) {
	console.error(
		'Usage: node translate-arabic-json.js <input-file-path> <output-file-path> [batch-size]',
	)
	process.exit(1)
}

const inputFilePath = process.argv[2]
const outputFilePath = process.argv[3]
const batchSize = parseInt(process.argv[4]) || 10

translateJsonContent(inputFilePath, outputFilePath, batchSize)
	.then(() => console.log('Process finished'))
	.catch((error) => console.error('Error:', error))
