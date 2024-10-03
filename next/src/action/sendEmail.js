'use server'

import EmailTemplate from '@/lib/email-template'
import { Resend } from 'resend'

export const sendEmail = async (formData) => {
	const resend = new Resend(process.env.RESEND_API_KEY)

	const name = formData.firstName
	const email = formData.email
	const message = formData.message

	try {
    // Send the main email to yourself
    const response = await resend.emails.send({
      from: 'Wazen <onboarding@resend.dev>',
      to: process.env.MY_EMAIL,
      subject: 'Email From Wazen',
      reply_to: email,
      react: EmailTemplate({ name, message }),
    });

    try {
      // Send auto-response to the client
      await resend.emails.send({
        from: 'Wazen <onboarding@resend.dev>',
        to: email,
        subject: 'Thank you for contacting us!',
        html: `<p>Hello ${name},</p><p>Thank you for reaching out! We've received your message and will get back to you soon.</p>`,
      });

    } catch (autoError) {
      console.error('Error sending auto-response:', autoError);
    }

    return response;
  } catch (error) {
    console.error('Error sending main email:', error);
    return { success: false, error: error.message };
  }
}
