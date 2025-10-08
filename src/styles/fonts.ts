// import localfont from 'next/font/local'
import { Rubik } from 'next/font/google'

// export const inter = Inter({
// 	subsets: ['latin'],
// 	display: 'swap',
// 	weight: ['400', '500', '600', '700'],
// 	variable: '--font-inter',
// })

// export const rubik = localfont({
// 	// src: '../../public/fonts/Rubik-VariableFont_wght.woff2',
// 	src: [
// 		{
// 			path: '../../public/fonts/rubik-v31-arabic-variable.woff2',
// 		},
// 		{
// 			path: '../../public/fonts/rubik-v31-latin-variable.woff2',
// 		},
// 	],
// 	display: 'swap',
// 	variable: '--font-inter',
// })

export const rubik = Rubik({
	subsets: ['latin', 'arabic'],
	display: 'swap',
	weight: ['400', '500', '600', '700'],
	variable: '--font-inter',
})
