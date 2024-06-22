import React from 'react'

const ContactForm = () => {
	return (
		<form action="#" className="space-y-8">
			<div className="flex  gap-4">
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
			<div className="flex  gap-4">
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
			<div className="flex  gap-4">
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
				className="hover:bg-primary-800 focus:ring-primary-300 bg-gray-100 rounded-sm px-5 py-3 text-gray-300 text-center text-sm font-medium focus:outline-none focus:ring-4 w-full"
			>
				أرسل لنا رسالة
			</button>
		</form>
	)
}

export default ContactForm
