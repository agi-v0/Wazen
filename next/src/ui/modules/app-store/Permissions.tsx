'use clinet'
import React from 'react'
import {
	PiBasket,
	PiIdentificationCard,
	PiSquaresFour,
	PiUsersThree,
	PiWebhooksLogo,
} from 'react-icons/pi'

function Permissions({
	app,
}: {
	app: {
		icon: Sanity.Image
		title: string
		description: any
		ctas: Sanity.CTA[]
		permissions: any
	}
}) {
	const PermissionIcons: any = {
		webhook: <PiWebhooksLogo className="text-2xl" />,
		orders: <PiBasket className="text-2xl" />,
		customers: <PiUsersThree className="text-2xl" />,
		basicInfo: <PiIdentificationCard className="text-2xl" />,
		products: <PiSquaresFour className="text-2xl" />,
	}

	return (
		<section className="section py-12">
			<div className="flex w-full flex-col justify-around gap-4 rounded-lg bg-gray-100 p-4 lg:flex-row">
				{Object.entries(app.permissions).map(([permission, isEnabled]) =>
					isEnabled ? (
						<div
							key={permission}
							className="flex h-20 flex-col items-center justify-center gap-2"
						>
							{PermissionIcons[permission]}
							{permission}
						</div>
					) : null,
				)}
			</div>
		</section>
	)
}

export default Permissions
