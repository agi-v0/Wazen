import '@/styles/globals.css'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { getSite } from '@/lib/sanity/queries'
import { routing } from '@/i18n/routing'
import { inter, rubik } from '@/styles/fonts'
// import dynamic from 'next/dynamic'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

import Script from 'next/script'
import IntercomClientComponent from '@/components/ui/intercom'

import { notFound } from 'next/navigation'
import Motion from '@/lib/MotionProvider'
// const Header = dynamic(() => import('@/ui/header'))
// const Footer = dynamic(() => import('@/ui/footer'))

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { locale: any }
}) {
	const resolvedParams = await params
	const locale = resolvedParams.locale
	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as any)) {
		notFound()
	}
	setRequestLocale(locale)
	//loading header and footer in one query
	const site = await getSite(locale)
	if (!site) {
		return
	}

	const { headerMenu, ctas, footerMenu, staticLinks, ga4, gtmId, contactInfo } =
		site
	return (
		// <NextIntlClientProvider>
		<html
			lang={locale}
			dir={locale == 'en' ? 'ltr' : 'rtl'}
			className={rubik.className}
		>
			{gtmId && <GoogleTagManager gtmId={gtmId} />}
			<body className="w-full">
				<Header
					headerMenu={headerMenu}
					contactInfo={contactInfo}
					ctas={ctas}
					locale={locale}
				/>
				<Motion>
					<main id="main-content" tabIndex={-1}>
						{children}
					</main>
				</Motion>
				<Toaster />
				<Footer
					contactInfo={contactInfo}
					footerMenu={footerMenu}
					staticLinks={staticLinks}
					locale={locale}
				/>

				<Script
					strategy="afterInteractive"
					id="intercom-settings"
					dangerouslySetInnerHTML={{
						__html: `window.intercomSettings = { api_base: "https://api-iam.intercom.io", app_id: "desatz83"};`,
					}}
				/>
				<IntercomClientComponent />
				{ga4 && <GoogleAnalytics gaId={ga4} />}
			</body>
		</html>
		// </NextIntlClientProvider>
	)
}
