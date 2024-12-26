import { Link } from '@/i18n/routing'
import processUrl from '@/lib/processUrl'
import { cn } from '@/lib/utils'
import * as m from 'motion/react-client'

export default function CTA({
	link,
	locale,
	style,
	className,
	children,
	...rest
}: Sanity.CTA & React.HTMLAttributes<HTMLAnchorElement>) {
	const props = {
		className: cn(style, className) || undefined,
		children:
			children || link?.label || link?.internal?.title || link?.external,
		...rest,
	}
	const FADE_DOWN_ANIMATION_VARIANTS = {
		hidden: { opacity: 0, y: -10 },
		show: { opacity: 1, y: 0, transition: { type: 'spring' } },
	}

	if (link?.type === 'internal' && link.internal)
		return (
			<Link
				locale={locale as 'ar' | 'en'}
				href={processUrl(link.internal, {
					base: false,
					params: link.params,
				})}
				legacyBehavior
				passHref
			>
				<m.a
					{...(props as any)}
					variants={FADE_DOWN_ANIMATION_VARIANTS as any}
				></m.a>
			</Link>
		)

	if (link?.type === 'external' && link.external)
		return (
			<m.a
				href={link.external}
				{...(props as any)}
				variants={FADE_DOWN_ANIMATION_VARIANTS}
			>
				{link.label}
			</m.a>
		)

	return props.children
}
