import Header from '@/ui/header'
import Footer from '@/ui/footer'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import '../../styles/app.css'

export default async function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: any }
}) {
	const messages = await getMessages()
	return (
		<html lang={locale} dir='rtl'>
			<body className="bg-white text-gray-950">
				<NextIntlClientProvider messages={messages}>
					<Header />
					<main id="main-content" tabIndex={-1}>
						{children}
					</main>
					<Footer />
					{draftMode().isEnabled && <VisualEditing />}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
