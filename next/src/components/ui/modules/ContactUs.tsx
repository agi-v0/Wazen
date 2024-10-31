import ContactForm from '@/components/ui/contact-form'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Link from 'next/link'

import {
	PiCaretLeftBold,
	PiPhone,
	PiEnvelope,
	PiMapPin,
} from '@/components/ui/Icons'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function ContactUs({
	content,
	contactInfo,
	locale,
}: Partial<{
	content: any
	contactInfo: any
	locale: any
}>) {
	const messages = await getMessages()

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h1') {
					return (
						<h1 className="h1 max-w-3xl text-start text-cyan-950 ltr:leading-tight rtl:leading-snug">
							{value.children.map((child: any) => child.text).join('')}
						</h1>
					)
				}
				if (value.style === 'h4') {
					return (
						<p className="text-large font-semibold text-cyan-950 rtl:leading-snug">
							{value.children.map((child: any) => child.text).join('')}
						</p>
					)
				}
				return (
					<p className="text-main text-cyan-950/80 rtl:leading-snug">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	const icons = [
		<PiPhone key="PiPhone" className="text-2xl text-cyan-950/60" />,
		<PiEnvelope key="PiEnvelope" className="text-2xl text-cyan-950/60" />,
		<PiMapPin key="PiMapPin" className="text-2xl text-cyan-950/60" />,
	]

	return (
		<section className="section py-24">
			<div className={'mb-10 flex max-w-2xl flex-col items-start gap-6'}>
				<PortableText value={content} components={components} />
			</div>
			<div className="fluid-gap grid grid-cols-1 justify-around md:grid-cols-2">
				<NextIntlClientProvider messages={messages}>
					<ContactForm />
				</NextIntlClientProvider>
				<div className="flex h-fit flex-col flex-wrap justify-end gap-x-8 gap-y-6 md:flex-row">
					{contactInfo.map((info: any, index: any) => (
						<div key={index} className="flex h-fit w-[240px] flex-col gap-3">
							{icons[index]}
							<PortableText value={info.title} components={components} />

							<span className="text-main group flex items-center text-teal-600">
								<Link
									href=""
									className="font-medium text-teal-600 no-underline"
									dir="ltr"
								>
									{info.link.label}
								</Link>
								<PiCaretLeftBold className="ms-1 size-3 translate-x-0 text-teal-500/50 transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-teal-600 ltr:rotate-180 ltr:group-hover:translate-x-1" />
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
