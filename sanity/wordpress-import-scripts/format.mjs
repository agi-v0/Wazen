import { promises as fs } from 'fs'
import { JSDOM } from 'jsdom'
import { Schema } from '@sanity/schema'
import { htmlToBlocks } from '@sanity/block-tools'

// Define the schema
const schemaDefinition = {
	name: 'myBlog',
	types: [
		{
			type: 'object',
			name: 'blogPost',
			fields: [
				{
					title: 'Title',
					type: 'string',
					name: 'title',
				},
				{
					title: 'Body',
					name: 'body',
					type: 'array',
					of: [{ type: 'block' }],
				},
			],
		},
	],
}

// Compile the schema
const compiledSchema = Schema.compile(schemaDefinition)

// Extract the block content type
const blockContentType = compiledSchema
	.get('blogPost')
	.fields.find((field) => field.name === 'body').type

// Function to convert HTML content to Sanity blocks
function convertHtmlToBlocks(htmlContent) {
	return htmlToBlocks(htmlContent, blockContentType, {
		parseHtml: (html) => new JSDOM(html).window.document,
	})
}

async function main() {
	try {
		// Read the input JSON file
		const data = await fs.readFile('scraped.json', 'utf8')

		// Parse the JSON data
		const arrayOfObjects = JSON.parse(data)

		// Convert each object's content to Sanity blocks format
		const updatedArray = arrayOfObjects.map((obj) => ({
			...obj,

			body: convertHtmlToBlocks(obj.body),
		}))

		// Write the updated array to a new JSON file
		await fs.writeFile('formatted.json', JSON.stringify(updatedArray, null, 2))
		console.log('File successfully written to formatted.json')
	} catch (err) {
		console.error('Error:', err)
	}
}

// Execute the main function
main()
