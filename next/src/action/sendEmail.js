'use server'

import EmailTemplate from '@/lib/email-template'
import { Resend } from 'resend'

export const sendEmail = async (formData) => {
	const resend = new Resend(process.env.RESEND_API_KEY)

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
			to: process.env.MY_EMAIL,
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
	} catch (error) {
		console.error('Error sending main email:', error)
		return { success: false, error: error.message }
	}
}
