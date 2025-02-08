import { promises as fs } from 'fs'

async function main() {
	try {
		// Read the input JSON file
		const data = await fs.readFile('decodedLinks.json', 'utf8')
		const imported = await fs.readFile('redirected.json', 'utf8')

		// Parse the JSON data
		const arrayOfObjects = JSON.parse(data)
		console.log(arrayOfObjects.length)

		const importedPosts = JSON.parse(imported)
		console.log(importedPosts.length)

		const filteredArray = arrayOfObjects.filter((obj) => {
			// Check if there's no matching post with the same slug
			return !importedPosts.some((post) => post.source === obj.slug)
		})
		const updatedArray = filteredArray.map((obj) => {
			obj.title = obj.slug
				.split('-')
				.map((letter, idx) => (idx == 0 ? letter.toUpperCase() : letter))
				.join(' ')
				.replace('/', '')
			return obj
		})

		// Write the updated array to a new JSON file
		await fs.writeFile(
			'comparedLinks.json',
			JSON.stringify(updatedArray, null, 2),
		)
		console.log('File successfully written to cleaned.json')
	} catch (err) {
		console.error('Error:', err)
	}
}

// Execute the main function
main()
