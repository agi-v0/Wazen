import Header from '@/ui/header'
import Footer from '@/ui/footer'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity'
import { inter, rubik } from './fonts'
import '../../styles/app.css'

export default async function RootLayout({
	children,
	params: { locale = 'ar' },
}: {
	children: React.ReactNode
	params: { locale: any }
}) {
	return (
		<html
			lang={locale}
			dir={locale == 'en' ? 'ltr' : 'rtl'}
			className={locale == 'en' ? inter.className : rubik.className}
		>
			<body className="bg-white text-gray-950">
				<Header locale={locale} />
				<main id="main-content" tabIndex={-1}>
					{children}
				</main>
				<Footer locale={locale} />
				{draftMode().isEnabled && <VisualEditing />}
			</body>
		</html>
	)
}
