const PricingBox = (props: {
	price: string
	duration: string
	packageName: string
	subtitle: string
	children: React.ReactNode
}) => {
	const { price, duration, packageName, subtitle, children } = props

	const firstList = [
		'النظام المحاسبي',
		'إدارة الموارد البشرية',
		'إدارة علاقات العملاء',
		'الأنشطة المخصصة',
	]

	return (
		<div className="w-full rounded-md bg-white">
			<div className="shadow-three hover:shadow-one relative rounded-sm px-8 py-10">
				<div className="flex flex-col items-start justify-between">
					<h4 className="text-dark mb-2 text-xl font-bold">{packageName}</h4>
					<p className="mb-7 text-base">{subtitle}</p>
				</div>
				<h3 className="mb-2 text-[32px] font-bold text-black">
					<span className="amount">{price}</span>ريال
					<span className="text-lg font-light">/{duration}</span>
				</h3>
				<div className="my-6">
					{firstList.map((listItem, index) => (
						<p key={index} className="mb-3 flex items-center">
							{listItem}
						</p>
					))}
				</div>
				<div className="my-6 rounded-md border-2 border-teal-500/20">
					<button className="bg-primary hover:shadow-signUp flex w-full items-center justify-center rounded-sm p-3 text-base font-semibold transition duration-300 ease-in-out hover:bg-opacity-80">
						إبدأ تجربتك المجانية
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	)
}

export default PricingBox
