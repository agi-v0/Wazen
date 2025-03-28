import Motion from '@/lib/MotionProvider'
import { NextIntlClientProvider } from 'next-intl'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NextIntlClientProvider>
				<Motion>{children}</Motion>
			</NextIntlClientProvider>
		</>
	)
}
