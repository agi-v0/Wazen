import { useTranslations } from 'next-intl'

export default function ReadTime({ value }: { value: number }) {
	const t = useTranslations('Blog')
	return (
		<span className="with-icon gap-1">
			{`${t('Read time')} ${Math.ceil(value)} ${t('minutes')}`}
		</span>
	)
}
