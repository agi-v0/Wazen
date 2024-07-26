import Header from '@/ui/header'
import Footer from '@/ui/footer'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity'
import { inter, rubik } from './fonts'
import '../../styles/app.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getSite } from '@/lib/sanity/queries'

export default async function RootLayout({
	children,
	params: { locale = 'ar' },
}: {
	children: React.ReactNode
	params: { locale: any }
}) {
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
			<body className="bg-white text-gray-950">
				<Header headerMenu={headerMenu} ctas={ctas} locale={locale} />
				<main id="main-content" tabIndex={-1}>
					{children}
				</main>
				<Footer
					footerMenu={footerMenu}
					staticLinks={staticLinks}
					locale={locale}
				/>
				{draftMode().isEnabled && <VisualEditing />}
			</body>
		</html>
	)
}
