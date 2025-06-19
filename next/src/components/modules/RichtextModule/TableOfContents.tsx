import { cn, slug } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export default function TableOfContents({
	headings,
}: {
	headings: Sanity.BlogPost['headings']
}) {
	const t = useTranslations('Blog')
	return (
		<div className="space-y-6 text-start">
			<h3 className="text-large font-semibold text-cyan-950">
				{t('Contents')}
			</h3>
			<ul className="flex flex-col items-start gap-4">
				{headings?.map(({ text, style }, key) => (
					<li
						className={cn(
							style == 'h2' && 'ms-0 font-semibold',
							style == 'h3' && 'ms-2 font-medium',
							'w-full max-w-72 grow text-cyan-950/60 transition-all hover:ms-0 hover:text-cyan-950',
						)}
						key={key}
					>
						<a className="link text-wrap" href={`#${slug(text)}`}>
							{text}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}
