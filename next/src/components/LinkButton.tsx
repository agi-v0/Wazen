// import {Link} from '@/i18n/routing'
import { Link } from '@/i18n/routing'
import processUrl from '@/lib/processUrl'
import { cn } from '@/lib/utils'

export default function LinkButton({
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

	if (link?.type === 'internal' && link.internal)
		return (
			<Link
				locale={locale as 'ar' | 'en'}
				href={processUrl(link.internal, {
					base: false,
					params: link.params,
				})}
				{...props}
			/>
		)

	if (link?.type === 'external' && link.external)
		return (
			<a href={link.external} {...props}>
				{link.label}
			</a>
		)

	return props.children
}
