import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { cn, slug } from '@/lib/utils'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import { useTranslations } from 'next-intl'

export default function TableOfContents({
	headings,
}: {
	headings: Sanity.BlogPost['headings']
}) {
	const t = useTranslations('Blog')
	return (
		<Accordion type="single" collapsible className="text-start">
			<AccordionItem
				value="contents"
				className="overflow-hidden rounded-2xl border-0"
			>
				<AccordionTrigger className="rounded-t-2xl bg-teal-100 p-4 hover:bg-teal-100/80 hover:text-[unset]">
					<h3 className="flex flex-row items-center gap-[0.2lh] font-semibold text-cyan-950">
						<Icon icon="ph:bookmarks" className="size-[0.8lh]" height="none" />
						{t('Contents')}
					</h3>
				</AccordionTrigger>
				<AccordionContent>
					<ul className="flex flex-col items-start gap-4 rounded-b-2xl bg-teal-50 px-6 pt-3 pb-6">
						{headings?.map(({ text, style }, key) => (
							<li
								className={cn(
									style == 'h2' && 'ms-0 font-semibold',
									style == 'h3' && 'ms-2 font-medium',
									'w-full max-w-72 grow text-sm text-cyan-950/60 transition-all hover:ms-0 hover:text-cyan-950',
								)}
								key={key}
							>
								<a className="link text-wrap" href={`#${slug(text)}`}>
									{text}
								</a>
							</li>
						))}
					</ul>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
