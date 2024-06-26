import React from 'react'
import { sendEmail } from '@/action/sendEmail'

const ContactForm = () => {
	const handleSendEmail = async (formData: any) => {
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
			className="w-full flex-1 space-y-8"
		>
			<div className="flex gap-4">
				<input
					type="text"
					id="first-name"
					className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
					placeholder="الإسم الاول"
					required
				/>
				<input
					type="text"
					id="last-name"
					className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
					placeholder="إسم العائلة"
					required
				/>
			</div>
			<div className="flex gap-4">
				<input
					type="text"
					id="company-name"
					className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
					placeholder="إسم الشركة"
					required
				/>
				<input
					type="text"
					id="business-field"
					className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
					placeholder="مجال العمل"
					required
				/>
			</div>
			<div className="flex gap-4">
				<input
					type="text"
					id="contact-number"
					className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
					placeholder="رقم للتواصل"
					required
				/>
				<input
					type="email"
					id="email"
					className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
					placeholder="الإيميل"
					required
				/>
			</div>
			<div className="sm:col-span-2">
				<textarea
					id="message"
					className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm"
					placeholder="اكتب رسالتك هنا..."
				></textarea>
			</div>
			<input id="terms-and-conditions" type="checkbox" />
			<button
				type="submit"
				className="hover:bg-primary-800 focus:ring-primary-300 w-full rounded-sm bg-gray-100 px-5 py-3 text-center text-sm font-medium text-gray-300 focus:outline-none focus:ring-4"
			>
				أرسل لنا رسالة
			</button>
		</form>
	)
}

export default ContactForm
