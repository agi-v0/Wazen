import { cn } from '@/lib/utils'
import CTA from './CTA'

export default function CTAList({
	ctas,
	className,
}: React.HTMLAttributes<HTMLParagraphElement> & {
	ctas?: Sanity.CTA[]
}) {
	return (
		<nav
			className={cn(
				'flex w-full flex-col-reverse flex-wrap items-center gap-x-4 gap-y-2 md:flex-row',
				className,
			)}
		>
			{ctas?.map((cta, key) => <CTA {...cta} key={key} />)}
		</nav>
	)
}
