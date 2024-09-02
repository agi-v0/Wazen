import { set2 } from '@/components/ui/portable-text'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from 'next-sanity'

export default function StatList({
	content,
	stats,
}: Partial<{
	content: any
	stats: {
		value: string
		text: string
	}[]
}>) {
	const set2: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h2') {
					return (
						<h2 className="h2 font-semibold leading-tight text-white">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-large text-teal-100">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	return (
		<section className="section relative overflow-clip py-12">
			<div className="bg-grid pointer-events-none absolute left-0 right-0 z-0 h-full w-full opacity-15"></div>
			<div className="fluid-gap flex w-full flex-col items-center rounded-2xl bg-gradient-to-tl from-cyan-950 to-cyan-700 p-[var(--size--6rem)]">
				{content && (
					<div className="mx-auto max-w-3xl space-y-6 text-center">
						<PortableText value={content} components={set2} />
					</div>
				)}

				<div className="flex w-full items-start justify-evenly gap-6 max-md:flex-col">
					{stats?.map((stat, key) => (
						<div className="w-full max-w-[250px]" key={key}>
							<dt className="h3 font-semibold text-white">{stat.value}</dt>
							<dd className="text-large text-balance font-normal text-teal-200">
								{stat.text}
							</dd>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
