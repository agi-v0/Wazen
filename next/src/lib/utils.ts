import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { stegaClean } from 'next-sanity'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
export function slug(str: string) {
	return (
		str
			.toLowerCase()
			.replace(/[^\d\u0621-\u064A]+/g, '-')
			// .replace(/[\s\W]+/g, '-')
			.replace(/-$/, '')
	)
}

export function clean(inputs: any) {
	return stegaClean(inputs)
}
