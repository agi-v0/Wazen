// import { GoogleTagManager } from '@next/third-parties/google'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity'
import '@/styles/app.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="ar" dir="rtl">
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
