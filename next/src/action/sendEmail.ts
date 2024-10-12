'use server'

import EmailTemplate from '@/lib/email-template'
import { Resend } from 'resend'

type formData = {
	firstName: string
	lastName: string
	companyName: string
	businessField: string
	email: string
	contactNumber: string
	message: string
}

export const sendEmail = async (formData: formData) => {
	const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

	const firstName = formData.firstName
	const lastName = formData.lastName
	const companyName = formData.companyName
	const businessField = formData.businessField
	const email = formData.email
	const contactNumber = formData.contactNumber
	const message = formData.message

	try {
		// Send the main email to yourself
		const response = await resend.emails.send({
			from: 'Wazen <onboarding@resend.dev>',
			to: process.env.NEXT_PUBLIC_RESEND_EMAIL as string,
			subject: 'Email From Wazen',
			reply_to: email,
			react: EmailTemplate({
				firstName,
				lastName,
				companyName,
				businessField,
				email,
				contactNumber,
				message,
			}),
		})

		return response
	} catch (error: any) {
		console.error('Error sending main email:', error)
		return { success: false, error: error.message }
	}
}
