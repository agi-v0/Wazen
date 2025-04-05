'use client'
import { LiveChatLoaderProvider, Intercom } from 'react-live-chat-loader'

export default function IntercomProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<LiveChatLoaderProvider providerKey="desatz83" provider="intercom">
			{children}
			<Intercom color="#14b8a6" />
		</LiveChatLoaderProvider>
	)
}
