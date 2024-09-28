'use server'

import EmailTemplate from '@/lib/email-template'
import { Resend } from 'resend'

export const sendEmail = async (formData) => {
	const resend = new Resend(process.env.RESEND_API_KEY)

	const name = formData.get('firstName')
	const email = formData.get('email')
	const message = formData.get('message')

	try {
		const response = await resend.emails.send({
			from: 'Wazen <onboarding@resend.dev>',
			to: process.env.MY_EMAIL,
			subject: 'Email From Wazen',
			reply_to: email,
			react: EmailTemplate({ name: name, message: message }),
		})

		// Send auto-response to the client
		await resend.emails.send({
			from: 'Wazen <onboarding@resend.dev>',
			to: email,
			subject: 'Thank you for contacting us!',
			html: `<p>Hello ${name},</p><p>Thank you for reaching out! We've received your message and will get back to you soon.</p>`,
		})

		return JSON.parse(response)
	} catch (error) {
		return error.toString()
	}
}
