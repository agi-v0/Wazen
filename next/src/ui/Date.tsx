export default function ({ value, locale }: { value: string; locale: any }) {
	if (!value) return null

	const formatted = new Date(value + 'T00:00:00').toLocaleDateString(
		locale == 'ar' ? 'ar' : 'en',
		{
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		},
	)

	return <time dateTime={value}>{formatted}</time>
}
