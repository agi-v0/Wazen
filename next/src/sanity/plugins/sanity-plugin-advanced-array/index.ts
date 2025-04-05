import {
	definePlugin,
	isArrayOfObjectsInputProps,
	isObjectItemProps,
} from 'sanity'
import { AdvancedArrayInput } from './components/AdvancedArrayInput'
import { AdvancedArrayItem } from './components/AdvancedArrayItem'

/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {advancedArray} from 'sanity-plugin-advanced-array'
 *
 * export default defineConfig({
 *   // ...other settings
 *   plugins: [
 *     // ...other plugins
 *     advancedArray()
 *   ],
 * })
 * ```
 */
export const advancedArray = definePlugin(() => {
	return {
		name: 'sanity-plugin-advanced-array',

		form: {
			components: {
				input: (props) => {
					if (
						isArrayOfObjectsInputProps(props) &&
						props.schemaType.options?.advanced
					) {
						return AdvancedArrayInput(props)
					}

					return props.renderDefault(props)
				},
				item: (props) => {
					if (
						isObjectItemProps(props) &&
						props.parentSchemaType.options?.advanced &&
						(props.parentSchemaType.options.advanced.inline !== 'off' ||
							props.parentSchemaType.options.advanced.select)
					) {
						return AdvancedArrayItem(props)
					}

					return props.renderDefault(props)
				},
			},
		},
	}
})
