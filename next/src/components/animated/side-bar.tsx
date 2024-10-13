import React from 'react'
import { PiTable } from 'react-icons/pi'
import { PiTableDuotone } from '@/ui/Icons'
import { useParams } from 'next/navigation'

function SideBar() {
	// const t = useTranslations('Index')

	const { locale } = useParams()

	const list = [
		' الحسابات',
		' نقاط البيع',
		' الأصول الثابتة',
		' العقارات',
		' الاعتمادات المستندية',
		' التخليص الجمركي',
		' النقليات',
		' معارض السيارات',
		' تأجير السيارات',
		' النقل الجماعي',
		' أجره',
		' الصيانة والتشغيل',
		' محطات الوقود',
		' الحج',
		' العمرة',
		' المشاريع',
		' التصنيع',
		' الكافيهات والمطاعم',
		' المدارس',
		' الاشتراكات',
		' المستشفيات',
		' الصيدليات',
		' شركات الادوية',
		' مجوهرات',
		' الخدمات اللوجيستية',
		' الموارد البشرية ',
		' علاقات العملاء',
		' مناديب التوزيع',
	]

	const EN_list = [
		'Accounts',
		'Sales Points',
		'Fixed Assets',
		'Real Estate',
		'Standing Credits',
		'Customs Clearance',
		'Migrations',
		'Car Shows',
		'Car Rentals',
		'Public Transportation',
		'Salary',
		'Maintenance and Operation',
		'Fuel Stations',
		'Hajj',
		'Umrah',
		'Projects',
		'Manufacturing',
		'Cafes and Restaurants',
		'Schools',
		'Subscriptions',
		'Hospitals',
		'Pharmacies',
		'Pharmaceutical Companies',
		'Jewelry',
		'Logistics Services',
		'Human Resources',
		'Customer Relationships',
		'Distribution Centers',
	]

	return (
		<div className="relative mx-auto h-[450px] w-[350px] flex-1 items-center justify-center overflow-hidden rounded-lg bg-cyan-950/40 py-2 text-white shadow-lg">
			<div className="text-main absolute left-0 right-0 top-0 z-[1] flex items-center gap-2 rounded-lg px-6 py-3 font-semibold backdrop-blur">
				<PiTableDuotone className="size-6" />

				<p>النظام الحسابي</p>
			</div>
			<div className="customScrollbar relative mx-3 h-full overflow-hidden pt-12">
				<ul className="text-main -border mb-3 me-3 border-sky-300">
					{locale == 'en'
						? EN_list.map((item) => (
								<li
									key={item}
									className={
										'cursor-default rounded-md px-3 py-2 text-end text-base font-medium text-white/80 hover:bg-white/20 hover:text-white'
									}
								>
									{item}
								</li>
							))
						: list.map((item) => (
								<li
									key={item}
									className={
										'cursor-default rounded-md px-3 py-2 text-end text-base font-medium text-white/80 hover:bg-white/20 hover:text-white'
									}
								>
									{item}
								</li>
							))}
				</ul>
			</div>
		</div>
	)
}

export default SideBar
