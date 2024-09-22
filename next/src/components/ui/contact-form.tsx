import React from 'react'
import { sendEmail } from '@/action/sendEmail'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'

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
					className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm transition-colors file:border-0 file:bg-white file:text-sm file:font-medium file:text-gray-400 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
					placeholder={t('First Name')}
					required
				/>
				<input
					type="text"
					id="last-name"
					className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm transition-colors file:border-0 file:bg-white file:text-sm file:font-medium file:text-gray-400 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
					placeholder={t('Last Name')}
					required
				/>
			</div>
			<div className="flex gap-4">
				<input
					type="text"
					id="company-name"
					className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm transition-colors file:border-0 file:bg-white file:text-sm file:font-medium file:text-gray-400 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
					placeholder={t('Company Name')}
					required
				/>
				<input
					type="text"
					id="business-field"
					className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm transition-colors file:border-0 file:bg-white file:text-sm file:font-medium file:text-gray-400 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
					placeholder={t('Business Field')}
					required
				/>
			</div>
			<div className="flex gap-4">
				<input
					type="text"
					id="contact-number"
					className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm transition-colors file:border-0 file:bg-white file:text-sm file:font-medium file:text-gray-400 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
					placeholder={t('Contact Number')}
					required
				/>
				<input
					type="email"
					id="email"
					className="flex h-12 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm transition-colors file:border-0 file:bg-white file:text-sm file:font-medium file:text-gray-400 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
					placeholder={t('Email')}
					required
				/>
			</div>
			<div className="sm:col-span-2">
				<textarea
					id="message"
					className="flex min-h-[60px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
					rows={4}
					placeholder={t('Write your message here')}
				></textarea>
			</div>
			<div className="flex items-center gap-2">
				<input
					id="terms-and-conditions"
					type="checkbox"
					className="size-4 rounded"
				/>
				<label htmlFor="terms-and-conditions" className="text-sm text-gray-600">
					{t('I agree to the terms and conditions')}
				</label>
			</div>
			<button type="submit" className={cn('primary', 'h-12 w-full')}>
				{t('Send Message')}
			</button>
		</form>
	)
}

export default ContactForm
