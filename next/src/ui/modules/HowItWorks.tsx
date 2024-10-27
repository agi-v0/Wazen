'use client'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import user from '../../../public/How-it-works/User.svg'
import chart from '../../../public/How-it-works/Chart.svg'
import sidebar from '../../../public/How-it-works/Sidebar.svg'
import Image from 'next/image'

export default function HowItWorks({
	content,
	steps,
}: Partial<{
	content: any
	steps: {
		title: string
		description: string
		text: string
		image: Sanity.Image
	}[]
}>) {
	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h4 text-center font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				if (value.style === 'h3') {
					return (
						<h3 className="text-large font-semibold leading-tight text-cyan-950">
							{value.children.map((child: any) => child.text).join('')}
						</h3>
					)
				}
				return (
					<p className="text-main mx-auto max-w-xl text-gray-600 md:max-w-3xl">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}
	const images = [user, sidebar, chart]
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true })

	return (
		<section className="section rounded-2xl bg-teal-100 from-teal-100 to-cyan-50 p-[var(--size--6rem)]">
			<div className="fluid-gap flex w-full flex-col items-center justify-center rounded-xl">
				<PortableText value={content} components={components} />
				<ul ref={ref} className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
					{steps?.map((step, index) => (
						<m.li
							key={step.title}
							initial="hidden"
							animate={isInView ? 'visible' : 'hidden'}
							variants={{
								hidden: { y: 20, opacity: 0 },
								visible: { y: 0, opacity: 1 },
							}}
							transition={{ type: 'easeOut', delay: index * 0.2 }}
							className="group z-[5] flex flex-col rounded-xl p-2 transition-all hover:bg-white hover:shadow-md"
						>
							<Image
								src={images[index]}
								alt={step.title}
								className="grid h-auto w-full place-items-center overflow-hidden rounded-lg bg-cyan-950/10 px-3 py-9 transition-all group-hover:bg-cyan-800"
							/>
							<div className="space-y-1 p-4 text-start">
								<h3 className="text-main font-semibold text-cyan-950 group-hover:text-teal-600">
									<span className="text-cyan-950/40">{index + 1}. </span>
									{step.title}
								</h3>
								<p className="text-small text-cyan-950/80">
									{step.description}
								</p>
							</div>
						</m.li>
					))}
				</ul>
			</div>
		</section>
	)
}
