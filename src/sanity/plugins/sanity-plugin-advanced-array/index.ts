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
						(props.schemaType.options as any)?.advanced
					) {
						return AdvancedArrayInput(props)
					}

					return props.renderDefault(props)
				},
				item: (props) => {
					if (
						isObjectItemProps(props) &&
						(props.parentSchemaType.options as any)?.advanced &&
						((props.parentSchemaType.options as any)?.advanced?.inline !==
							'off' ||
							(props.parentSchemaType.options as any)?.advanced?.select)
					) {
						return AdvancedArrayItem(props)
					}

					return props.renderDefault(props)
				},
			},
		},
	}
})
