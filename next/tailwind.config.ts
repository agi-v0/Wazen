import plugin from 'tailwindcss/plugin'
import type { Config } from 'tailwindcss'

const {
	default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme('colors'))
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
	)

	addBase({
		':root': newVars,
	})
}

const config: Config = {
	content: ['./src/{app,ui}/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				ink: '#000',
				canvas: '#fff',
			},
			fontFamily: {
				sans: ['Rubik', 'sans-serif'],
			},
			maxHeight: {
				fold: 'calc(100svh - var(--header-height))',
			},
			animation: {
				scroll:
					'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			keyframes: {
				scroll: {
					to: {
						transform: 'translate(calc(-50% - 0.5rem))',
					},
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
		},
	},

	plugins: [
		plugin(function ({ addVariant }: any) {
			addVariant('header-closed', 'body:has(#header-open:not(:checked)) &')
		}),
		addVariablesForColors,
	],
	safelist: ['primary', 'secondary', 'tertiary'],
}
export default config
