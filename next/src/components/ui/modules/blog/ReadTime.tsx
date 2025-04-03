import { Icon } from '@iconify-icon/react'
import { useTranslations } from 'next-intl'

export default function ReadTime({ value }: { value: number }) {
	const t = useTranslations('Blog')
	return (
		<span className="flex flex-row items-center gap-1 text-cyan-950/60">
			<Icon icon="ph:clock-line" className="size-4" />
			{`${t('Read time')} ${Math.ceil(value)} ${t('minutes')}`}
		</span>
	)
}
