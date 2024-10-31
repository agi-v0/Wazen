import { cn } from '@/lib/utils'
import Button from './Button'

export default function CTAList({
	ctas,
	className,
}: React.HTMLAttributes<HTMLParagraphElement> & {
	ctas?: Sanity.CTA[]
}) {
	return (
		<div
			className={cn('flex flex-col items-center gap-4 md:flex-row', className)}
		>
			{ctas?.map((cta, key) => <Button {...cta} key={key} />)}
		</div>
	)
}
