import Navigation from './Navigation'
import Social from './Social'

export default async function Footer({
	locale,
	footerMenu,
	staticLinks,
	contactInfo,
}: {
	locale: string
	footerMenu?: Sanity.Navigation
	staticLinks?: Sanity.Navigation
	contactInfo: any
}) {
	return (
		<section className="bg-cyan-950 text-center text-white">
			<div className="section relative overflow-hidden py-12">
				<div className="flex w-full flex-col justify-between gap-20">
					<div className="flex w-full flex-col justify-between gap-10 lg:flex-row">
						<Navigation
							contactInfo={contactInfo.contactInfo}
							locale={locale}
							footerMenu={footerMenu}
						/>
					</div>
					<Social
						locale={locale}
						className="justify-between"
						staticLinks={staticLinks}
					/>
				</div>
			</div>
		</section>
	)
}
