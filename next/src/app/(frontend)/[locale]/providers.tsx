import { Toaster } from '@/components/ui/toaster'
import Motion from '@/lib/motionProvider'
import { NextIntlClientProvider } from 'next-intl'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NextIntlClientProvider>
				<Motion>{children}</Motion>
				<Toaster />
			</NextIntlClientProvider>
		</>
	)
}
