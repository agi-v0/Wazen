import { promises as fs } from 'fs'

async function main() {
	try {
		// Read the input JSON file
		const data = await fs.readFile('links.json', 'utf8')

		// Parse the JSON data
		const arrayOfObjects = JSON.parse(data)

		// Add metadata and categories keys to each object, set _createdAt and _publishedAt, and delete link and slug
		const updatedArray = arrayOfObjects.map((obj) => {
			const source = obj.slug // Store slug before deleting

			obj._type = 'redirect'
			obj.destination = '/blog' + source
			obj.permanent = true
			obj.source = source

			delete obj.link
			delete obj.slug
			delete obj.date
			delete obj.id
			delete obj.title

			return obj
		})

		// Write the updated array to a new JSON file
		await fs.writeFile('redirected.json', JSON.stringify(updatedArray, null, 2))
		console.log('File successfully written to cleaned.json')
	} catch (err) {
		console.error('Error:', err)
	}
}

// Execute the main function
main()
