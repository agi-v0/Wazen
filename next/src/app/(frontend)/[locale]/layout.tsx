import '@/styles/globals.css'
import { GoogleTagManager } from '@next/third-parties/google'
import { getSite } from '@/sanity/lib/queries'
import { routing } from '@/i18n/routing'
import { rubik } from '@/styles/fonts'

import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'

import { setRequestLocale } from 'next-intl/server'

import { notFound } from 'next/navigation'

import Providers from './providers'
import { Suspense } from 'react'

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

	const site = await getSite(locale)

	if (!site) {
		return
	}
	const { headerMenu, ctas, footerMenu, staticLinks, ga4, gtmId, contactInfo } =
		site

	const secret = process.env.SANITY_REVALIDATE_SECRET?.trim() ?? ''
	console.log('secret length =', secret.length)
	console.log('secret hex    =', Buffer.from(secret).toString('hex'))

	return (
		<html
			lang={locale}
			dir={locale == 'en' ? 'ltr' : 'rtl'}
			className={rubik.className}
		>
			{gtmId && <GoogleTagManager gtmId={gtmId} />}
			<body className="w-full">
				<Providers>
					<Header
						headerMenu={headerMenu}
						contactInfo={contactInfo}
						ctas={ctas}
						locale={locale}
					/>
					<main id="main-content" tabIndex={-1}>
						{children}
					</main>
					<Suspense>
						<Footer
							contactInfo={contactInfo}
							footerMenu={footerMenu}
							staticLinks={staticLinks}
							locale={locale}
						/>
					</Suspense>
				</Providers>

				{/* <Script
					strategy="afterInteractive"
					id="intercom-settings"
					dangerouslySetInnerHTML={{
						__html: `window.intercomSettings = { api_base: "https://api-iam.intercom.io", app_id: "desatz83"};`,
					}}
				/> */}
				{/* <IntercomClientComponent /> */}
			</body>
		</html>
	)
}
