'use client'

import { useState } from 'react'
import FileUpload from '@/components/FileUpload'
import { PortableText } from '@portabletext/react'

type JobTab = {
	label: string
	sublabel?: string
	type: 'form' | 'text'
	mainTitle?: string
	subtitle?: string
	introText?: any
	description?: any
	requirements?: any
	benefits?: any
	button?: {
		text?: string
		link?: string
	}
}

export default function JobApplicationTabs({
	title,
	subtitle,
	tabs,
}: {
	title: string
	subtitle?: string
	tabs: JobTab[]
}) {
	const [activeTab, setActiveTab] = useState(0)
	const [expanded, setExpanded] = useState(false)

	return (
		<main id="main-content">
			<section
				className="pt-16 lg:pt-28"
				style={{
					backgroundImage: `
            linear-gradient(transparent, white),
            radial-gradient(at center top, rgb(21, 94, 117) 0%, rgb(45, 212, 191) 60%, rgb(255, 255, 255) 100%)
          `,
				}}
			>
				<div className="container mx-auto max-w-6xl px-4">
					{/* العنوان الرئيسي والفرعي */}
					{(title || subtitle) && (
						<div className="mb-10 text-center">
							{title && (
								<h1 className="h1 mx-auto max-w-3xl text-center text-balance text-white ltr:leading-tight rtl:leading-snug">
									{title}
								</h1>
							)}
							{subtitle && (
								<p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-800">
									{subtitle}
								</p>
							)}
						</div>
					)}

					{/* الشبكة الرئيسية */}
					<div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-lg md:grid-cols-[1.2fr_2.5fr]">
						{/* التابات الجانبية */}
						<aside className="flex flex-col gap-3">
							{tabs.map((tab, idx) => {
								const isFirst = idx === 0
								const isActive = activeTab === idx

								let buttonClass =
									'border border-gray-200 bg-white hover:bg-gray-50 text-[#170F49]'
								if (isFirst) {
									buttonClass =
										'border-transparent bg-gradient-to-l from-[#02B6BE] to-[#5FC19C] text-white shadow-md'
								} else if (isActive) {
									buttonClass =
										'border-2 border-[#2DD4BF] bg-white shadow-md text-[#170F49]'
								}

								return (
									<button
										key={idx}
										onClick={() => {
											setActiveTab(idx)
											setExpanded(false)
										}}
										className={`rounded-xl px-4 py-3 text-right font-semibold transition-all ${buttonClass}`}
									>
										<div className="flex flex-col">
											<div className="flex items-center justify-between">
												<span className="text-right font-[Cairo] text-[24px] leading-[46px] font-bold text-[#170F49]">
													{tab.label}
												</span>

												{tab.button?.text && (
													<a
														href={tab.button.link || '#'}
														className={`inline-flex items-center justify-center gap-1 rounded-full border px-4 py-1.5 font-[Cairo] text-[14px] font-bold transition ${
															isFirst
																? 'border-white text-white hover:bg-white hover:text-[#155E75]'
																: 'border-[#2DD4BF] text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-white'
														}`}
													>
														{tab.button.text}
													</a>
												)}
											</div>

											{tab.sublabel && (
												<span className="text-right font-[Cairo] text-[14px] leading-[23px] text-[#3F3F3F]">
													{tab.sublabel}
												</span>
											)}
										</div>
									</button>
								)
							})}
						</aside>

						{/* المحتوى */}
						<div className="rounded-xl border border-gray-100 bg-white p-6 text-right shadow-inner transition-all">
							{/* === نموذج التقديم === */}
							{tabs[activeTab].type === 'form' ? (
								<section
									className={`mx-auto max-w-5xl rounded-2xl bg-white font-[Cairo] transition-all duration-500 ${
										expanded
											? 'max-h-[4000px]'
											: 'max-h-[700px] overflow-hidden'
									}`}
								>
									{/* الأعلى */}
									<div className="mb-8 flex items-center justify-between">
										<span className="font-semibold text-[#2DD4BF]">
											وازن المالية
										</span>

										{/* الأزرار عموديًا */}
										<div className="flex flex-col items-end gap-3">
											{/* 🔘 زر التكبير */}
											<button
												onClick={() => setExpanded(!expanded)}
												className={`rounded-md p-2 shadow-md transition ${
													expanded
														? 'bg-[#2DD4BF] text-white hover:bg-[#14b8a6]'
														: 'bg-white text-gray-700 hover:bg-gray-100'
												}`}
												title={expanded ? 'تصغير' : 'تكبير'}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="currentColor"
													className="h-5 w-5"
												>
													{expanded ? (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M20 12H4"
														/>
													) : (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M4 8V4h4M4 16v4h4m12-12V4h-4m4 12v4h-4"
														/>
													)}
												</svg>
											</button>

											{/* ⚡ زر إرسال الطلب */}
											<button className="flex items-center gap-2 rounded-full bg-[#2DD4BF] px-6 py-2 font-bold text-white shadow-md transition hover:bg-[#14b8a6]">
												⚡ إرسال الطلب
											</button>
										</div>
									</div>

									{/* محتوى النموذج */}
									<div className="mb-10 text-right">
										<h2 className="mb-2 text-3xl font-bold text-[#170F49]">
											فرص جديدة بانتظارك
										</h2>
										<p className="text-lg text-gray-600">
											نسعى دوماً في وازن باستقطابالطاقات التي تؤمن بالتطوير
											المستمر وتمتلك شغف التغيير.
										</p>
									</div>

									<div className="mb-6 flex border-b border-gray-200">
										<button className="border-b-2 border-[#2DD4BF] px-4 pb-2 text-lg font-bold text-[#2DD4BF]">
											البيانات الأساسية
										</button>
										<button className="px-4 pb-2 text-lg font-semibold text-gray-400">
											المرفقات
										</button>
									</div>

									<form className="grid grid-cols-1 gap-6 text-right md:grid-cols-3">
										<div>
											<label className="mb-1 block font-semibold text-gray-700">
												الاسم بالكامل
											</label>
											<input
												type="text"
												placeholder="حسام محمد"
												className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
											/>
										</div>
										{/* تاريخ الميلاد */}
										<div>
											<label className="mb-1 block font-semibold text-gray-700">
												تاريخ الميلاد
											</label>
											<input
												type="text"
												placeholder="5-8-1996"
												className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
											/>
										</div>
										{/* النوع */}
										<div>
											<label className="mb-1 block font-semibold text-gray-700">
												النوع
											</label>
											<select className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]">
												<option>ذكر</option> <option>أنثى</option>
											</select>
										</div>
										{/* البلد */}
										<div>
											<label className="mb-1 block font-semibold text-gray-700">
												البلد
											</label>
											<input
												type="text"
												placeholder="السعودية"
												className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
											/>
										</div>
										{/* المدينة */}
										<div>
											<label className="mb-1 block font-semibold text-gray-700">
												المدينة
											</label>
											<input
												type="text"
												placeholder="الرياض"
												className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
											/>
										</div>
										{/* العمر */}
										<div>
											<label className="mb-1 block font-semibold text-gray-700">
												العمر
											</label>
											<input
												type="text"
												placeholder="30 عاماً"
												className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
											/>
										</div>
										{/* رقم الهاتف */}
										<div>
											<label className="mb-1 block font-semibold text-gray-700">
												رقم الهاتف
											</label>
											<input
												type="text"
												placeholder="+966 465 2990 243"
												className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
											/>
										</div>
										{/* التخصص */}
										<div>
											<label className="mb-1 block font-semibold text-gray-700">
												التخصص
											</label>
											<input
												type="text"
												placeholder="محلل بيانات"
												className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
											/>
										</div>
										{/* الجنسية */}
										<div>
											<label className="mb-1 block font-semibold text-gray-700">
												الجنسية
											</label>
											<input
												type="text"
												placeholder="سعودي"
												className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
											/>
										</div>
										{/* نوع الهوية */}
										<div>
											<label className="mb-1 block font-semibold text-gray-700">
												نوع الهوية (اختياري)
											</label>
											<input
												type="text"
												placeholder="البطاقة الوطنية"
												className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
											/>
										</div>
										{/* رقم الهوية */}
										<div>
											<label className="mb-1 block font-semibold text-gray-700">
												رقم الهوية (اختياري)
											</label>
											<input
												type="text"
												placeholder="5-8-19996"
												className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
											/>
										</div>
										{/* البريد الإلكتروني */}
										<div>
											<label className="mb-1 block font-semibold text-gray-700">
												البريد الإلكتروني
											</label>
											<input
												type="email"
												placeholder="Hossam@example.com"
												className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
											/>
										</div>
										{/* ✅ قسم رفع الملفات */}
										<div className="col-span-3 mt-12 w-full">
											<h3 className="mb-4 text-right text-2xl font-bold text-[#170F49]">
												إرفاق المستندات
											</h3>
											<p className="mb-6 text-right text-gray-500">
												يرجى إرفاق نسخة من السيرة الذاتية بصيغة PDF أو ملف
												مشابه. <br /> يسمح بتحميل ملفات حتى حجم 50 ميجا بايت.
											</p>
											{/* منطقة رفع الملفات */}
											<label
												htmlFor="file"
												className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#2DD4BF] bg-[#F9FAFB] p-10 text-center transition hover:bg-[#F0FDFA]"
											>
												<FileUpload />
											</label>
											<textarea
												placeholder="رسالة أو ملاحظات إضافية"
												className="mt-6 w-full rounded-md border border-cyan-300 bg-[#14B8A617] px-4 py-2 text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]"
												rows={12}
											></textarea>
										</div>
									</form>
								</section>
							) : (
								// === قسم النصوص ===
								<div className="space-y-8">
									<div className="flex items-start justify-between">
										<div className="text-right">
											{tabs[activeTab].mainTitle && (
												<h3 className="text-2xl font-bold text-cyan-900">
													{tabs[activeTab].mainTitle}
												</h3>
											)}
											{tabs[activeTab].subtitle && (
												<p className="font-medium text-gray-600">
													{tabs[activeTab].subtitle}
												</p>
											)}
										</div>

										{/* الزرين فوق بعض */}
										<div className="flex flex-col items-end gap-3">
											{/* زر التكبير */}
											<button
												onClick={() => setExpanded(!expanded)}
												className={`rounded-md p-2 shadow-md transition ${
													expanded
														? 'bg-[#2DD4BF] text-white hover:bg-[#14b8a6]'
														: 'bg-white text-gray-700 hover:bg-gray-100'
												}`}
												title={expanded ? 'تصغير' : 'تكبير'}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="currentColor"
													className="h-5 w-5"
												>
													{expanded ? (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M20 12H4"
														/>
													) : (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M4 8V4h4M4 16v4h4m12-12V4h-4m4 12v4h-4"
														/>
													)}
												</svg>
											</button>

											{/* زر انضم إلينا */}
											<a
												href="#"
												className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-l from-[#02B6BE] to-[#5FC19C] px-6 py-2 font-[Cairo] text-[16px] font-bold text-white shadow-md transition hover:opacity-90"
											>
												⚡ انضم إلينا
											</a>
										</div>
									</div>

									{/* المحتوى */}
									<div
										className={`transition-all duration-700 ease-in-out ${
											expanded
												? 'max-h-[4000px] opacity-100'
												: 'max-h-[300px] overflow-hidden opacity-70'
										}`}
									>
										{tabs[activeTab].introText && (
											<div>
												<h4 className="mb-2 text-lg font-semibold text-cyan-800">
													مقدمة
												</h4>
												<PortableText value={tabs[activeTab].introText} />
											</div>
										)}
										{tabs[activeTab].description && (
											<div>
												<h4 className="mb-2 text-lg font-semibold text-cyan-800">
													الوصف
												</h4>
												<PortableText value={tabs[activeTab].description} />
											</div>
										)}
										{tabs[activeTab].requirements && (
											<div>
												<h4 className="mb-2 text-lg font-semibold text-cyan-800">
													المتطلبات
												</h4>
												<PortableText value={tabs[activeTab].requirements} />
											</div>
										)}
										{tabs[activeTab].benefits && (
											<div>
												<h4 className="mb-2 text-lg font-semibold text-cyan-800">
													المميزات
												</h4>
												<PortableText value={tabs[activeTab].benefits} />
											</div>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* قسم الخطوات السفلية */}
			<section className="w-full bg-white px-4 py-16 text-center">
				<p className="mb-2 text-sm font-medium text-gray-400">
					مراحل دورة التوظيف الكاملة
				</p>
				<h2 className="mb-12 text-2xl font-bold text-cyan-950 md:text-3xl">
					تعرف على الخطوات الأساسية <br /> في دورة التوظيف
				</h2>

				{/* شبكة الخطوات */}
				<div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
					{[
						{
							title: 'التحضير',
							img: 'https://cdn.sanity.io/images/m7bjawr3/production/b584f13dac2886c80f1bd6ebe3df096206e4e9c8-110x110.png',
						},
						{
							title: 'الاستقطاب',
							img: 'https://cdn.sanity.io/images/m7bjawr3/production/9fc9d5b971392da393e019787a7e2560ecc24a69-102x117.png',
						},
						{
							title: 'الفرز',
							img: 'https://cdn.sanity.io/images/m7bjawr3/production/d9065bd03d399134f8e977117aa5ad672c4a2faa-122x118.png',
						},
						{
							title: 'الإختيار',
							img: 'https://cdn.sanity.io/images/m7bjawr3/production/0797b12c8699908d73465feb8433b8e2a7ceaea2-122x116.png',
						},
						{
							title: 'التعيين',
							img: 'https://cdn.sanity.io/images/m7bjawr3/production/15f12d6557ae665987c44d9efd836a7060faf42e-121x117.png',
						},
					].map((step, i) => (
						<div
							key={i}
							className="flex flex-col items-center gap-3 text-center transition-transform hover:scale-105"
						>
							<img
								src={step.img}
								alt={step.title}
								className="h-32 w-32 object-contain md:h-36 md:w-36"
							/>
							<p className="font-[29LT Bukra] text-center text-[35.8px] leading-[61px] font-semibold text-[#14B8A6]">
								{step.title}
							</p>
						</div>
					))}
				</div>
			</section>
		</main>
	)
}
