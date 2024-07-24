import { Pathnames, LocalePrefix } from 'next-intl/routing';

export const defaultLocale = 'ar' as const;
export const locales = ['ar', 'en'] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
	"en": "English",
	"ar": "Arabic",
};

export const pathnames: Pathnames<typeof locales> = {
	'/': '/',
	'/pathnames': {
		ar: '/pathnames',
		en: '/pfadnamen'
	}
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';