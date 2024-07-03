'use client'

import ContactForm from '@/components/contact-form'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Link from 'next/link'
import { IoMdCall } from 'react-icons/io'
import { IoMail } from 'react-icons/io5'
import { PiMapPinFill } from 'react-icons/pi'

export default function ContactUs({
	content,
	contactInfo,
}: Partial<{
	content: any
	contactInfo: any
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h1') {
					return (
						<h1 className="leading-tight text-cyan-950 md:text-5xl font-bold">
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
		<section className={'section p-24'}>
			<div className={'mb-10 flex max-w-2xl flex-col items-start gap-8'}>
				<PortableText value={content} components={components} />
			</div>
			<div className="flex justify-around gap-20">
				<ContactForm />
				<div className="flec-row flex w-full flex-1 flex-wrap justify-end gap-4">
					{contactInfo.map((info: any, index: any) => (
						<div key={index} className="flex gap-3 h-fit w-[240px] flex-col">
							<IoMail className='text-2xl' />
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
	)
}
