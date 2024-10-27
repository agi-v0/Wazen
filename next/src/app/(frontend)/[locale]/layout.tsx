import '../../../styles/globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getSite } from '@/lib/sanity/queries'
import { routing } from '@/i18n/routing'
import { inter, rubik } from '../../../styles/fonts'
// import dynamic from 'next/dynamic'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { domAnimation, LazyMotion } from 'framer-motion'
// const Header = dynamic(() => import('@/ui/header'))
// const Footer = dynamic(() => import('@/ui/footer'))

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}
const loadFeatures = () =>
	import('@/styles/features').then((res) => res.default)

export default async function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: any }
}) {
	setRequestLocale(locale)
	//loading header and footer in one query
	const site = await getSite(locale)
	if (!site) {
		return
	}
	const { headerMenu, ctas, footerMenu, staticLinks, ga4, contactInfo } = site
	return (
		<NextIntlClientProvider>
			<html
				lang={locale}
				dir={locale == 'en' ? 'ltr' : 'rtl'}
				className={locale == 'en' ? inter.className : rubik.className}
			>
				<body className="w-full">
					<Header
						headerMenu={headerMenu}
						contactInfo={contactInfo}
						ctas={ctas}
						locale={locale}
					/>
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
					{ga4 && <GoogleAnalytics gaId={ga4} />}
				</body>
			</html>
		</NextIntlClientProvider>
	)
}
