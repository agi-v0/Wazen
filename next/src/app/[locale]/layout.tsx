// import { GoogleTagManager } from '@next/third-parties/google'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity'
import '../../styles/app.css'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

export default function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: any }
}) {

	return (
		<html lang={locale} dir="rtl">
			{/* <GoogleTagManager gtmId='' /> */}

			<body className="bg-white text-gray-950">
				<Header />
				<main id="main-content" tabIndex={-1}>
					{children}
				</main>
				<Footer />

				{draftMode().isEnabled && <VisualEditing />}
			</body>
		</html>
	)
}
