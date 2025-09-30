export default function DateTag({
	value,
	locale,
}: {
	value: string
	locale: any
}) {
	if (!value) return null
	const formatted = new Date(value + 'T00:00:00').toLocaleDateString(locale, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})

	return (
		<time dateTime={value} suppressHydrationWarning>
			{formatted}
		</time>
	)
}
