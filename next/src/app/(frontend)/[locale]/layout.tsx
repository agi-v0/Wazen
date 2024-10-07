import Header from '@/ui/header'
import Footer from '@/ui/footer'
// import { draftMode } from 'next/headers'
// import { VisualEditing } from 'next-sanity'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getSite } from '@/lib/sanity/queries'
import { locales } from '@/i18n/config'
import { unstable_setRequestLocale } from 'next-intl/server'
<<<<<<< HEAD:next/src/app/[locale]/layout.tsx
import { Toaster } from "@/components/ui/toaster"
=======
import '../../../styles/app.css'
import { inter, rubik } from '../../../styles/fonts'
>>>>>>> dev:next/src/app/(frontend)/[locale]/layout.tsx

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: any }
}) {
	unstable_setRequestLocale(locale)
	//loading header and footer in one query
	const site = await getSite(locale)
	if (!site) {
		return
	}
	const { headerMenu, ctas, footerMenu, staticLinks } = site

	return (
		<html
			lang={locale}
			dir={locale == 'en' ? 'ltr' : 'rtl'}
			className={locale == 'en' ? inter.className : rubik.className}
		>
			<body className="w-full">
				<Header headerMenu={headerMenu} ctas={ctas} locale={locale} />
				<main id="main-content" tabIndex={-1}>
					{children}
				</main>
				<Toaster />
				<Footer
					footerMenu={footerMenu}
					staticLinks={staticLinks}
					locale={locale}
				/>
				{/* {draftMode().isEnabled && <VisualEditing />} */}
				<SpeedInsights />
			</body>
		</html>
	)
}
