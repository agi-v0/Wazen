import { promises as fs } from 'fs'

async function main() {
	try {
		// Read the input JSON file
		const data = await fs.readFile('formatted.json', 'utf8')

		// Parse the JSON data
		const arrayOfObjects = JSON.parse(data)

		// Function to format date to 'YYYY-MM-DD'
		const formatDate = (dateStr) => {
			const date = new Date(dateStr)
			const year = date.getUTCFullYear()
			const month = String(date.getUTCMonth() + 1).padStart(2, '0')
			const day = String(date.getUTCDate()).padStart(2, '0')
			return `${year}-${month}-${day}`
		}

		// Add metadata and categories keys to each object, set _createdAt and _publishedAt, and delete link and slug
		const updatedArray = arrayOfObjects.map((obj) => {
			obj._type = 'blog.post'
			obj._createdAt = `${obj.date}Z`
			obj.publishDate = formatDate(obj._createdAt) // Use a hardcoded date for example

			const slug = obj.slug // Store slug before deleting

			delete obj.link
			delete obj.slug
			delete obj.date

			obj.metadata = {
				_type: 'metadata',
				noIndex: false,
				slug: {
					current: slug, // Use the stored slug
					_type: 'slug',
				},
				title: obj.title,
			}
			//obj.categories = {
			//	_createdAt: '2024-05-22T17:28:12Z',
			//	_rev: 'cZChE2RoIaPtOnTrLfny8O',
			//	_type: 'blog.category',
			//	_id: 'dc32d105-dde4-41a8-95c6-addc6f355e9e',
			//	title: 'Finance',
			//	_updatedAt: '2024-05-22T17:28:12Z',
			//}
			return obj
		})

		// Write the updated array to a new JSON file
		await fs.writeFile('cleaned.json', JSON.stringify(updatedArray, null, 2))
		console.log('File successfully written to cleaned.json')
	} catch (err) {
		console.error('Error:', err)
	}
}

// Execute the main function
main()
