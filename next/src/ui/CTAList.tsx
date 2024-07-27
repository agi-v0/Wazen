import { cn } from '@/lib/utils'
import CTA from './CTA'
import Button from './Button'

export default function CTAList({
	ctas,
	className,
}: React.HTMLAttributes<HTMLParagraphElement> & {
	ctas?: Sanity.CTA[]
}) {
	return (
		<div
			className={cn(
				'flex w-full flex-col flex-wrap items-center gap-x-4 gap-y-2 md:flex-row',
				className,
			)}
		>
			{ctas?.map((cta, key) => <Button {...cta} key={key} />)}
		</div>
	)
}
