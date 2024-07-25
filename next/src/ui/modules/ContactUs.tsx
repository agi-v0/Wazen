'use client'

import ContactForm from '@/components/ui/contact-form'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Link from 'next/link'
import { IoMdCall } from 'react-icons/io'
import { IoMail } from 'react-icons/io5'
import { PiMapPinFill } from 'react-icons/pi'
import { NextIntlClientProvider } from 'next-intl'

export default function ContactUs({
	content,
	contactInfo,
	locale,
}: Partial<{
	content: any
	contactInfo: any
	locale: any
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h1') {
					return (
						<h1 className="font-bold leading-tight text-cyan-950 md:text-5xl">
							{value.children.map((child: any) => child.text).join('')}
						</h1>
					)
				}
				return (
					<p className="text-gray-700 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	const icons = [IoMail, IoMdCall, PiMapPinFill]

	return (
		<NextIntlClientProvider
			defaultTranslationValues={{
				i: (text) => <i>{text}</i>,
			}}
			locale={locale}
		>
			<section className={'section p-24'}>
				<div className={'mb-10 flex max-w-2xl flex-col items-start gap-8'}>
					<PortableText value={content} components={components} />
				</div>
				<div className="flex justify-around gap-20">
					<ContactForm />
					<div className="flec-row flex w-full flex-1 flex-wrap justify-end gap-4">
						{contactInfo.map((info: any, index: any) => (
							<div key={index} className="flex h-fit w-[240px] flex-col gap-3">
								<IoMail className="text-2xl" />
								<PortableText value={info.title} components={components} />
								<PortableText value={info.subtitle} components={components} />
								<Link href="" className="text-teal-600 no-underline">
									{info.link.label}
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>
		</NextIntlClientProvider>
	)
}
