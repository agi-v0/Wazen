import { inter } from '../(frontend)/[locale]/fonts'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body style={{ margin: 0 }} className={inter.className}>
				{children}
			</body>
		</html>
	)
}
