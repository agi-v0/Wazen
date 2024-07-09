import { cn, slug } from '@/lib/utils'

export default function TableOfContents({
	headings,
}: {
	headings: Sanity.BlogPost['headings']
}) {
	return (
		<div className="space-y-6 text-start">
			<h3 className="text-large font-semibold text-cyan-950">المحتويات</h3>
			<ul className="flex flex-col gap-4">
				{headings?.map(({ text, style }, key) => (
					<li
						className={cn(
							style == 'h2' && 'ms-0 font-semibold',
							style == 'h3' && 'ms-2',
							'max-w-72 flex-grow text-gray-950/60 transition-all hover:ms-0 hover:text-gray-950',
						)}
						key={key}
					>
						<a className="link" href={`#${slug(text)}`}>
							{text}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}
