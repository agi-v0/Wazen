import ContactForm from '@/components/contact-form'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'

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
						<h1 className="font-semibold leading-tight text-cyan-950">
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

	return (
		<section className={'section py-24'}>
			<div className={'mb-10 flex max-w-2xl flex-col items-start gap-8'}>
				<PortableText value={content} components={components} />
			</div>
			<div className="flex ">
				<ContactForm />
				<div className="bg-red-200">
					{contactInfo.map((info: any, index: any) => (
						<div key={index} >
							<PortableText value={info.title} components={components} />
							<PortableText value={info.subtitle} components={components} />
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
