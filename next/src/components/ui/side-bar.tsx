import React from 'react'
import { PiTable } from 'react-icons/pi'

function SideBar() {
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

	return (
		<div className="flex justify-center text-white">
			<div className="h-[480px] w-[330px] overflow-hidden rounded-md bg-black/20 pb-14">
				<div className="flex items-center gap-2 px-4 py-2 text-2xl">
					<PiTable />
					<p> النظام الحسابي</p>
				</div>
				<div className="customScrollbar mx-3 h-full">
					<ul className="px-4 text-2xl">
						{list.map((item) => (
							<li
								className={
									'cursor-default rounded-md px-2 py-1 text-lg text-end hover:bg-white/20'
								}
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default SideBar
