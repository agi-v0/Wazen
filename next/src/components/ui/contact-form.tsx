import React from 'react'
import { sendEmail } from '@/action/sendEmail'
import { getTranslations } from 'next-intl/server'

const ContactForm = async () => {

	const t = await getTranslations('ContactUs')

	const handleSendEmail = async (formData: any) => {
		'use server'

		try {
			const response = await sendEmail(formData)

			if (response) {
				console.log('Your message was sent successfully!')
			}
		} catch (error) {
			console.log(error)
			console.log('Something went wrong!')
		}

		// document.getElementById('contact-form').reset()
	}

	return (
		<form
			id="contact-form"
			action={handleSendEmail}
			className="contact-us w-full space-y-8"
		>
			<div className="flex gap-4">
				<input
					type="text"
					id="first-name"
					className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900 shadow-sm"
					placeholder={t('First Name')}
					required
				/>
				<input
					type="text"
					id="last-name"
					className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900 shadow-sm"
					placeholder={t('Family Name')}
					required
				/>
			</div>
			<div className="flex gap-4">
				<input
					type="text"
					id="company-name"
					className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900 shadow-sm"
					placeholder={t('Company Name')}
					required
				/>
				<input
					type="text"
					id="business-field"
					className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900 shadow-sm"
					placeholder={t('Business Field')}
					required
				/>
			</div>
			<div className="flex gap-4">
				<input
					type="text"
					id="contact-number"
					className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900 shadow-sm"
					placeholder={t('Contact Number')}
					required
				/>
				<input
					type="email"
					id="email"
					className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900 shadow-sm"
					placeholder={t('Email')}
					required
				/>
			</div>
			<div className="sm:col-span-2">
				<textarea
					id="message"
					className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-sm border border-gray-300 p-2.5 text-sm text-gray-900 shadow-sm"
					rows={4}
					placeholder={t('Write your message here')}
				></textarea>
			</div>
			<input id="terms-and-conditions" type="checkbox" className="me-2" />
			<label htmlFor="terms-and-conditions">{t('I agree to the terms and conditions')}</label>
			<button
				type="submit"
				className="hover:bg-primary-800 focus:ring-primary-300 w-full rounded-sm bg-gray-100 px-5 py-3 text-center text-sm font-medium text-gray-300 focus:outline-none focus:ring-4"
			>
				{t('Send Message')}
			</button>
		</form>
	)
}

export default ContactForm
