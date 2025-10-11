import { Toaster } from '@/components/ui/toaster'
import IntercomProvider from '@/lib/intercomProvivder'
import Motion from '@/lib/motionProvider'
import { NextIntlClientProvider } from 'next-intl'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NextIntlClientProvider>
				{/* <IntercomProvider> */}
				<Motion>{children}</Motion>
				{/* </IntercomProvider> */}
				<Toaster />
			</NextIntlClientProvider>
		</>
	)
}
