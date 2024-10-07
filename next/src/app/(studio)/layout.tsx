import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body
				style={{
					height: '100vh',
					maxHeight: '100dvh',
					overscrollBehavior: 'none',
					WebkitFontSmoothing: 'antialiased',
					overflow: 'auto',
					margin: 0,
				}}
			>
				{children}
				<SpeedInsights />
			</body>
		</html>
	)
}
