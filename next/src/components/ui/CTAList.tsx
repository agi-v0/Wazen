import { cn } from '@/lib/utils'
import CTA from './CTA'

export default function CTAList({
	ctas,
	className,
}: React.HTMLAttributes<HTMLAnchorElement> & {
	ctas?: Sanity.CTA[]
}) {
	return (
		<div
			className={cn('flex flex-col items-center gap-4 md:flex-row', className)}
		>
			{ctas?.map((cta, key) => <CTA {...cta} key={key} />)}
		</div>
	)
}
