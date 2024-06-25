'use client'

import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import user from '../../../public/How-it-works/User.svg'
import chart from '../../../public/How-it-works/Chart.svg'
import sidebar from '../../../public/How-it-works/sidebar.svg'
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
						<h2 className="h3 font-semibold leading-tight text-cyan-950">
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
	const isInView = useInView(ref)

	return (
		<section className={'section py-12'}>
			<div className="-border-8 fluid-padding fluid-gap flex w-full flex-col items-center justify-evenly rounded-xl border-white bg-gradient-to-tl from-teal-100 to-cyan-50 shadow-md">
				<div className="my-6">
					<PortableText value={content} components={components} />
				</div>
				<ul ref={ref} className="grid w-full grid-cols-1 lg:grid-cols-3">
					{steps?.map((step, index) => (
						<motion.li
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
							<div className="grid h-64 w-full place-items-center overflow-hidden rounded-lg bg-cyan-950/10 px-2 py-8">
								<Image src={images[index]} alt={step.title} />
							</div>
							<div className="space-y-1 p-4 text-start">
								<h3 className="text-main font-semibold text-gray-950 group-hover:text-cyan-950">
									<span className="text-gray-400">{index + 1}. </span>
									{step.title}
									{/* <PiCaretLeftBold className="inline-block size-4 translate-x-0 text-cyan-950/50 opacity-0 transition-transform duration-150 group-hover:-translate-x-[4px] group-hover:opacity-100" /> */}
								</h3>
								<p className="text-small text-gray-600">{step.description}</p>
							</div>
						</motion.li>
					))}
				</ul>
				{/* <ul className="flex w-full flex-col justify-evenly md:flex-row">
					{steps?.map((step, index) => (
						<li
							className="flex flex-col items-center justify-center gap-4"
							key={index}
						>
							<Img
								image={step.image}
								imageWidth={200}
								className="rounded-xl border-8 border-teal-100"
							/>
							<div className="my-4 text-2xl">{step.text}</div>
						</li>
					))}
				</ul> */}
			</div>
		</section>
	)
}
