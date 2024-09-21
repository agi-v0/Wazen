import ContactForm from '@/components/ui/contact-form'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Link from 'next/link'
import { IoMdCall } from 'react-icons/io'
import { IoMail } from 'react-icons/io5'
import { PiCaretLeftBold, PiMapPinFill } from 'react-icons/pi'

export default async function ContactUs({
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
				if (value.style === 'h4') {
					return (
						<h4 className="text-xl font-bold leading-tight">
							{value.children.map((child: any) => child.text).join('')}
						</h4>
					)
				}
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

	const icons = [
		<IoMdCall className="text-2xl" />,
		<IoMail className="text-2xl" />,
		<PiMapPinFill className="text-2xl" />,
	]

	return (
		<section className="section py-24">
			<div className={'mb-10 flex max-w-2xl flex-col items-start gap-8'}>
				<PortableText value={content} components={components} />
			</div>
			<div className="flex flex-col justify-around gap-20 md:flex-row">
				<div className="flex-1">
					<ContactForm />
				</div>
				<div className="flex flex-1 flex-col flex-wrap justify-end gap-y-6 gap-x-8 md:flex-row h-fit">
					{contactInfo.map((info: any, index: any) => (
						<div key={index} className="flex h-fit w-[240px] flex-col gap-3">
							{icons[index]}
							<PortableText value={info.title} components={components} />

							<span className="text-main group flex items-center text-teal-600">
								<Link href="" className="text-teal-600 no-underline" dir="ltr">
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
