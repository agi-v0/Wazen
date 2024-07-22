import React from 'react'
import { PiTable } from 'react-icons/pi'
import { Icon } from '@iconify/react'

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
		<div className="mx-auto flex w-[350px] items-center justify-center rounded-lg bg-cyan-950/40 text-white shadow-lg">
			<div className="relative h-[450px] w-full overflow-hidden pb-14">
				<div className="text-main flex items-center gap-2 px-6 py-3 font-semibold">
					<Icon icon="ph:table" className="size-6" />
					<p>النظام الحسابي</p>
				</div>
				<div className="mask absolute h-full w-full"></div>
				<div className="customScrollbar -border relative mx-3 h-full border-red-300">
					<ul className="text-main -border me-3 border-sky-300">
						{list.map((item) => (
							<li
								key={item}
								className={
									'cursor-default rounded-md px-3 py-2 text-end text-base font-medium text-white/80 hover:bg-white/20 hover:text-white'
								}
								key={index}
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
