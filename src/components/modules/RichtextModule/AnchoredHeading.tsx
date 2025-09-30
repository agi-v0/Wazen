import { slug } from '@/lib/utils'
import type { PortableTextBlock, PortableTextComponentProps } from 'next-sanity'

const headingStyles = {
	h2: 'h2 max-w-3xl text-pretty font-semibold leading-tight text-cyan-950',
	h3: 'h3 max-w-3xl text-pretty font-semibold leading-tight text-cyan-950',
}

export default function AnchoredHeading({
	as: Tag,
	value,
	children,
}: {
	as: keyof typeof headingStyles
} & PortableTextComponentProps<PortableTextBlock>) {
	const text = value.children.map((child: any) => child.text).join('')
	const id = slug(text)

	return (
		<Tag id={id} className={`group ${headingStyles[Tag]}`}>
			{children}
			<a
				className="ms-2 opacity-0 transition-opacity group-hover:opacity-100"
				href={`#${id}`}
				aria-label={`Link to ${text}`}
			>
				🔗
			</a>
		</Tag>
	)
}
