const fs = require('fs')
const path = require('path')
const ts = require('typescript')

// Script is run from `next/`, so adjust the path accordingly
const schemasDir = path.join(__dirname, 'src/sanity/schemas')
const targetFunctions = ['defineType', 'defineField']
// Store modifications needed, grouped by file path
// Map<string, { start: number; end: number; replacement: string }[]>
const modificationsByFile = new Map()

/**
 * Recursively finds all TypeScript files in a directory.
 * @param {string} dirPath The directory path to search.
 * @returns {string[]} An array of file paths.
 */
function findTsFiles(dirPath) {
	let files = []
	try {
		const items = fs.readdirSync(dirPath, { withFileTypes: true })
		for (const item of items) {
			const fullPath = path.join(dirPath, item.name)
			if (item.isDirectory()) {
				// Avoid node_modules and other potential large/irrelevant directories
				if (item.name === 'node_modules' || item.name.startsWith('.')) {
					continue
				}
				files = files.concat(findTsFiles(fullPath))
			} else if (
				item.isFile() &&
				item.name.endsWith('.ts') &&
				!item.name.endsWith('.d.ts')
			) {
				files.push(fullPath)
			}
		}
	} catch (error) {
		// Handle cases where the directory might not exist or is inaccessible
		console.warn(
			`Warning: Could not read directory ${dirPath}: ${error.message}`,
		)
	}
	return files
}

/**
 * Visits nodes in the AST to find target function calls and collect modification details.
 * @param {ts.Node} node The current AST node.
 * @param {ts.SourceFile} sourceFile The source file object.
 */
function visit(node, sourceFile) {
	if (ts.isCallExpression(node)) {
		const expression = node.expression
		const functionName = ts.isPropertyAccessExpression(expression)
			? expression.name.getText(sourceFile)
			: expression.getText(sourceFile)

		if (targetFunctions.includes(functionName) && node.arguments.length > 0) {
			const firstArg = node.arguments[0]
			let objectLiteralNode = null

			if (ts.isObjectLiteralExpression(firstArg)) {
				objectLiteralNode = firstArg
			}
			// Add other potential wrappers if necessary (arrow func, as expr, etc.)
			// else if (ts.isArrowFunction(firstArg) && ts.isObjectLiteralExpression(firstArg.body)) {
			//   objectLiteralNode = firstArg.body;
			// } else if (ts.isAsExpression(firstArg) && ts.isObjectLiteralExpression(firstArg.expression)) {
			//   objectLiteralNode = firstArg.expression;
			// }

			if (objectLiteralNode) {
				const filePath = sourceFile.fileName
				const objectSource = objectLiteralNode.getText(sourceFile)
				// Get accurate start/end, considering potential whitespace/comments around the node
				const callStart = node.getStart(sourceFile, true)
				const callEnd = node.getEnd()

				// Ensure leading/trailing trivia (like comments, whitespace) of the object literal
				// isn't included if it belongs *outside* the wrapper conceptually.
				// This might need refinement depending on formatting.
				// For now, we replace the entire call expression span.

				if (!modificationsByFile.has(filePath)) {
					modificationsByFile.set(filePath, [])
				}
				modificationsByFile.get(filePath).push({
					start: callStart,
					end: callEnd,
					replacement: objectSource,
				})
			}
		}
	}

	ts.forEachChild(node, (child) => visit(child, sourceFile))
}

/**
 * Applies modifications to a file content string.
 * @param {string} content Original file content.
 * @param {{ start: number; end: number; replacement: string }[]} mods Modifications for this file.
 * @returns {string} Modified file content.
 */
function applyModifications(content, mods) {
	// Sort modifications in reverse order by start position
	// This prevents index shifts from affecting subsequent replacements
	mods.sort((a, b) => b.start - a.start)

	let newContent = content
	for (const mod of mods) {
		newContent =
			newContent.slice(0, mod.start) +
			mod.replacement +
			newContent.slice(mod.end)
	}
	return newContent
}

// --- Main Execution ---

console.log('🚨 WARNING: This script will modify schema files in place! 🚨')
console.log('Ensure you have a backup or are using version control (Git).')
// Optional: Add a prompt/delay here if needed
// require('readline').createInterface({ input: process.stdin, output: process.stdout }).question('Press Enter to continue...', () => { mainLogic(); process.exit(); });

function mainLogic() {
	try {
		console.log(`
Scanning schema files in: ${schemasDir}`)
		const tsFiles = findTsFiles(schemasDir)
		console.log(
			`Found ${tsFiles.length} potentially relevant TypeScript files.`,
		)
		if (tsFiles.length === 0) {
			console.log(
				'No TypeScript files found in the specified directory. Exiting.',
			)
			return
		}

		for (const filePath of tsFiles) {
			const fileContent = fs.readFileSync(filePath, 'utf8')
			const sourceFile = ts.createSourceFile(
				filePath,
				fileContent,
				ts.ScriptTarget.Latest,
				true, // setParentNodes flag
			)
			visit(sourceFile, sourceFile)
		}

		console.log(`
Found ${modificationsByFile.size} files with potential modifications.`)

		if (modificationsByFile.size > 0) {
			console.log('Applying modifications...')
			for (const [filePath, mods] of modificationsByFile.entries()) {
				console.log(
					` -> Modifying ${path.relative(__dirname, filePath)} (${
						mods.length
					} changes)`,
				)
				try {
					const originalContent = fs.readFileSync(filePath, 'utf8')
					const newContent = applyModifications(originalContent, mods)
					fs.writeFileSync(filePath, newContent, 'utf8')
				} catch (writeError) {
					console.error(`    Error writing file ${filePath}:`, writeError)
				}
			}
			console.log('✅ Modifications complete.')
		} else {
			console.log(
				'No defineType or defineField calls found requiring modification.',
			)
		}
	} catch (error) {
		console.error(
			`\n❌ An error occurred during parsing or modification:`,
			error,
		)
		if (error.code === 'ENOENT' && error.path === schemasDir) {
			console.error(
				`\nPlease ensure the schemas directory path '${schemasDir}' exists and the script is run from the project root.`,
			)
		}
	}
}

// Run the main logic
mainLogic()
