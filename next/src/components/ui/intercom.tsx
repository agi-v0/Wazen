// src/components/IntercomClientComponent.tsx

'use client'
import { useEffect } from 'react'

const IntercomClientComponent: React.FC = () => {
	useEffect(() => {
		window.intercomSettings = {
			api_base: 'https://api-iam.intercom.io',
			app_id: 'desatz83', // Replace with your actual Intercom app ID.
		}

		if (window.Intercom) {
			window.Intercom('reattach_activator')
			window.Intercom('update', window.intercomSettings)
		} else {
			const script = document.createElement('script')
			script.src = 'https://widget.intercom.io/widget/desatz83'
			script.async = true
			document.body.appendChild(script)
		}
	}, [])

	return null
}

export default IntercomClientComponent
