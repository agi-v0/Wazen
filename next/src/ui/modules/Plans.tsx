import Pricing from '@/components/Pricing'
import { set2 } from '@/components/ui/portable-text'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import { NextIntlClientProvider } from 'next-intl'
import {getMessages} from 'next-intl/server';

export default async function Plans({
	content,
	plans,
}: Partial<{
	content: any
	plans: any
}>) {

	const messages = await getMessages();

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-main font-semibold text-gray-400">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section className="section py-[20vh]">
			<div className="fluid-gap flex w-full flex-col items-center">
				<div className="flex flex-col justify-center gap-6 text-center">
					<PortableText value={content} components={set2} />
				</div>
				<NextIntlClientProvider messages={messages}>
				<Pricing plans={plans} />
				</NextIntlClientProvider>
			</div>
		</section>
	)
}
