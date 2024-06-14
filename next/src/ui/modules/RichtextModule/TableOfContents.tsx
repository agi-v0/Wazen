import { cn, slug } from '@/lib/utils'

export default function TableOfContents({
	headings,
}: {
	headings: Sanity.BlogPost['headings']
}) {
	return (
		<div>
			<div>المحتويات</div>

			<ul className="mt-2">
				{headings?.map(({ text, style }, key) => (
					<li className={cn(style == 'h3' && 'ml-4')} key={key}>
						<a className="link" href={`#${slug(text)}`}>
							{text}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}
