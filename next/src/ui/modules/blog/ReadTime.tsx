export default function ReadTime({ value }: { value: number }) {
	return (
		<span className="with-icon gap-1">
			 وقت القراءة {Math.ceil(value)} دقيقة
		</span>
	)
}
