export default function Pretitle({
	className,
	children,
}: React.HTMLProps<HTMLParagraphElement>) {
	if (!children) return null

	return <p className={className}>{children}</p>
}
