import Brief from './Brief'

export default function BriefGroup({
	briefs,
}: Partial<{
	briefs: Sanity.Module[]
}>) {
	return (
		<div className="bg-gradient-to-b from-teal-50 from-90% to-white">
			{briefs?.map((brief) => <Brief {...brief} key={brief._key} />)}
		</div>
	)
}
