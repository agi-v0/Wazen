import { PortableText } from '@portabletext/react'

export default function FAQList({
	content,
	items,
	sideNote,
}: Partial<{
	content: any
	items: {
		question: string
		answer: any
	}[]
	sideNote: any
}>) {

	return (
		<section
			className="section space-y-4"
			itemScope
			itemType="https://schema.org/FAQPage"
		>
			<header className="richtext text-start">
				<PortableText value={content} />
			</header>

			<div className="flex flex-col justify-between items-center gap-4 md:flex-row">
				<div className="w-full lg:w-[70%]">
					{items?.map(({ question, answer }, key) => (
						<details
							className="accordion border-b border-ink/10"
							itemScope
							itemProp="mainEntity"
							itemType="https://schema.org/Question"
							key={key}
						>
							<summary className="py-4 font-bold" itemProp="name">
								{question}
							</summary>
							<div
								className="anim-fade-to-b pb-4"
								itemScope
								itemProp="acceptedAnswer"
								itemType="https://schema.org/Answer"
							>
								<div className="richtext" itemProp="text">
									<PortableText value={answer} />
								</div>
							</div>
						</details>
					))}
				</div>

				<div className="h-[200px] w-[300px] bg-[#F0FDFA]">
					{sideNote.mainTitle.label}
				</div>
			</div>
		</section>
	)
}
