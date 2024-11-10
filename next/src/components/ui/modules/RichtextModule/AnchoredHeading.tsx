import { slug } from '@/lib/utils'
import type { PortableTextBlock, PortableTextComponentProps } from 'next-sanity'
import { ReactNode } from 'react'

export default function AnchoredHeading({
	children,
	value,
}: ReactNode & PortableTextComponentProps<PortableTextBlock>) {
	const id = slug(value.children[0].text)

	return (
		<span id={id} className="group">
			{children}

			<a className="ms-2 md:hidden md:group-hover:inline-block" href={`#${id}`}>
				🔗
			</a>
		</span>
	)
}
