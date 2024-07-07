import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  "ar": "Arabic",
  "en": "English",
};

export const { Link, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });