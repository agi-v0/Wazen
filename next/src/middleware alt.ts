// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import createMiddleware from 'next-intl/middleware'
// import { localePrefix, defaultLocale, locales, pathnames } from './i18n/config'

// // Define your redirects here
// const redirects = [
// 	{
// 		destination: '/blog/ما-هي-التسوية-المالية',
// 		source: '/ما-هي-التسوية-المالية',
// 	},
// 	{
// 		destination: '/blog/المحاسبة-الادارية',
// 		source: '/المحاسبة-الادارية',
// 	},
// 	{ destination: '/blog/الزكاة-والدخل', source: '/الزكاة-والدخل' },
// 	{
// 		destination: '/blog/ما-هو-نظام-حماية-الاجور؟',
// 		source: '/ما-هو-نظام-حماية-الاجور؟',
// 	},
// 	{
// 		destination: '/blog/اصدار-فواتير-الكترونية',
// 		source: '/اصدار-فواتير-الكترونية',
// 	},
// 	{ destination: '/blog/فودكس', source: '/فودكس' },
// 	{ destination: '/blog/المشتقات-المالية', source: '/المشتقات-المالية' },
// 	{
// 		destination: '/blog/visa-mada-master-card',
// 		source: '/visa-mada-master-card',
// 	},
// 	{ destination: '/blog/ربط-خطوط-الانتاج', source: '/ربط-خطوط-الانتاج' },
// 	{
// 		destination: '/blog/قائمة-الارباح-والخسائر',
// 		source: '/قائمة-الارباح-والخسائر',
// 	},
// 	{
// 		destination: '/blog/التكاليف-الثابتة-والمتغيرة',
// 		source: '/التكاليف-الثابتة-والمتغيرة',
// 	},
// 	{
// 		destination: '/blog/ما-المقصود-بإعداد-الميزانية',
// 		source: '/ما-المقصود-بإعداد-الميزانية',
// 	},
// 	{ destination: '/blog/unifonic', source: '/unifonic' },
// 	{ destination: '/blog/foodics', source: '/foodics' },
// 	{ destination: '/blog/نير-باي', source: '/نير-باي' },
// 	{ destination: '/blog/دليل-الحسابات', source: '/دليل-الحسابات' },
// 	{ destination: '/blog/التدفقات-النقدية', source: '/التدفقات-النقدية' },
// 	{
// 		destination: '/blog/international-technology-exhibition',
// 		source: '/international-technology-exhibition',
// 	},
// 	{ destination: '/blog/برنامج-حسابات', source: '/برنامج-حسابات' },
// 	{
// 		destination: '/blog/حساب-رصيد-الاجازات',
// 		source: '/حساب-رصيد-الاجازات',
// 	},
// 	{
// 		destination: '/blog/برنامج-مشاركة-الطابعات',
// 		source: '/برنامج-مشاركة-الطابعات',
// 	},
// 	{ destination: '/blog/alrajhi-bank', source: '/alrajhi-bank' },
// 	{ destination: '/blog/الاقرار-الضريبي', source: '/الاقرار-الضريبي' },
// 	{
// 		destination: '/blog/ماهو-التحليل-المالي',
// 		source: '/ماهو-التحليل-المالي',
// 	},
// 	{ destination: '/blog/مطابقة-الرصيد', source: '/مطابقة-الرصيد' },
// 	{ destination: '/blog/وزارة-التجارة', source: '/وزارة-التجارة' },
// 	{ destination: '/blog/واتس-اب-2', source: '/واتس-اب-2' },
// 	{
// 		destination: '/blog/المصروفات-المستحقة',
// 		source: '/المصروفات-المستحقة',
// 	},
// 	{
// 		destination: '/blog/السنه-المالية-الجديده',
// 		source: '/السنه-المالية-الجديده',
// 	},
// 	{
// 		destination: '/blog/برنامج-حساب-الراتب',
// 		source: '/برنامج-حساب-الراتب',
// 	},
// 	{
// 		destination: '/blog/الجرد-الدوري-والمستمر',
// 		source: '/الجرد-الدوري-والمستمر',
// 	},
// 	{ destination: '/blog/سند-قبض-الكتروني', source: '/سند-قبض-الكتروني' },
// 	{
// 		destination: '/blog/إدارة-الحسابات-المالية',
// 		source: '/إدارة-الحسابات-المالية',
// 	},
// 	{
// 		destination: '/blog/معرض-الذهب-والمجوهرات',
// 		source: '/معرض-الذهب-والمجوهرات',
// 	},
// 	{ destination: '/blog/whats-app', source: '/whats-app' },
// 	{ destination: '/blog/معادلة-الميزانية', source: '/معادلة-الميزانية' },
// 	{ destination: '/blog/مصرف-الراجحي', source: '/مصرف-الراجحي' },
// 	{ destination: '/blog/ادارة-المخازن', source: '/ادارة-المخازن' },
// 	{ destination: '/blog/فوترة-الكترونية', source: '/فوترة-الكترونية' },
// 	{
// 		destination: '/blog/الضرائب-في-السعودية',
// 		source: '/الضرائب-في-السعودية',
// 	},
// 	{ destination: '/blog/مصانع-المستقبل', source: '/مصانع-المستقبل' },
// 	{ destination: '/blog/الرسوم-الجمركية', source: '/الرسوم-الجمركية' },
// 	{
// 		destination: '/blog/عناصر-قائمة-الدخل',
// 		source: '/عناصر-قائمة-الدخل',
// 	},
// 	{
// 		destination: '/blog/إدارة-الموارد-للمصانع',
// 		source: '/إدارة-الموارد-للمصانع',
// 	},
// 	{
// 		destination: '/blog/نظام-حماية-الاجور',
// 		source: '/نظام-حماية-الاجور',
// 	},
// 	{ destination: '/blog/ادارة-المشتريات', source: '/ادارة-المشتريات' },
// 	{
// 		destination: '/blog/سند-استلام-الاموال',
// 		source: '/سند-استلام-الاموال',
// 	},
// 	{
// 		destination: '/blog/تخطيط-الموارد-البشرية',
// 		source: '/تخطيط-الموارد-البشرية',
// 	},
// 	{
// 		destination: '/blog/معايير-المحاسبة-الدولية',
// 		source: '/معايير-المحاسبة-الدولية',
// 	},
// 	{ destination: '/blog/salla', source: '/salla' },
// 	{
// 		destination: '/blog/تقارير-مناديب-المبيعات',
// 		source: '/تقارير-مناديب-المبيعات',
// 	},
// 	{
// 		destination: '/blog/برنامج-مصانع-المستقبل',
// 		source: '/برنامج-مصانع-المستقبل',
// 	},
// 	{ destination: '/blog/قيود-الاهلاك', source: '/قيود-الاهلاك' },
// 	{
// 		destination: '/blog/المعرض-الدولي-للتكنولوجيا',
// 		source: '/المعرض-الدولي-للتكنولوجيا',
// 	},
// 	{ destination: '/blog/القيمة-الدفترية', source: '/القيمة-الدفترية' },
// 	{ destination: '/blog/أنواع-المصروفات', source: '/أنواع-المصروفات' },
// 	{ destination: '/blog/حساب-تكاليف', source: '/حساب-تكاليف' },
// 	{ destination: '/blog/تخطيط-اداري', source: '/تخطيط-اداري' },
// 	{ destination: '/blog/wazen-hr', source: '/wazen-hr' },
// 	{
// 		destination: '/blog/حساب-الضريبة-في-السعودية',
// 		source: '/حساب-الضريبة-في-السعودية',
// 	},
// 	{ destination: '/blog/قيد-المبيعات', source: '/قيد-المبيعات' },
// 	{
// 		destination: '/blog/المحاسبة-الادارية-2',
// 		source: '/المحاسبة-الادارية-2',
// 	},
// 	{
// 		destination: '/blog/ما-هو-البيع-بالتجزئة',
// 		source: '/ما-هو-البيع-بالتجزئة',
// 	},
// 	{
// 		destination: '/blog/تعريف-الاهلاك-فى-المحاسبة',
// 		source: '/تعريف-الاهلاك-فى-المحاسبة',
// 	},
// 	{ destination: '/blog/woocommerce', source: '/woocommerce' },
// 	{ destination: '/blog/قيد-مشتريات', source: '/قيد-مشتريات' },
// 	{ destination: '/blog/ميزان-المراجعة', source: '/ميزان-المراجعة' },
// 	{ destination: '/blog/التخطيط-المالي', source: '/التخطيط-المالي' },
// 	{
// 		destination: '/blog/الجرد-السنوي-للمخازن',
// 		source: '/الجرد-السنوي-للمخازن',
// 	},
// 	{
// 		destination: '/blog/ما-هي-التسوية-البنكية',
// 		source: '/ما-هي-التسوية-البنكية',
// 	},
// 	{
// 		destination: '/blog/تطبيق-وازن-hr-الخدمة-الذاتية',
// 		source: '/تطبيق-وازن-hr-الخدمة-الذاتية',
// 	},
// 	{ destination: '/blog/mc-gov', source: '/mc-gov' },
// 	{ destination: '/blog/الارباح-المحتجزة', source: '/الارباح-المحتجزة' },
// 	{ destination: '/blog/تقارير-سنوية', source: '/تقارير-سنوية' },
// 	{ destination: '/blog/قيود-اليومية', source: '/قيود-اليومية' },
// 	{ destination: '/blog/تطبيق-محاسبي', source: '/تطبيق-محاسبي' },
// 	{
// 		destination: '/blog/الالتزامات-المتداولة',
// 		source: '/الالتزامات-المتداولة',
// 	},
// 	{
// 		destination: '/blog/برنامج-محاسبي-متكامل',
// 		source: '/برنامج-محاسبي-متكامل',
// 	},
// 	{
// 		destination: '/blog/ما-هي-قائمة-المركز-المالي',
// 		source: '/ما-هي-قائمة-المركز-المالي',
// 	},
// 	{ destination: '/blog/كشف-حساب-العملاء', source: '/كشف-حساب-العملاء' },
// 	{ destination: '/blog/whats-app-2', source: '/whats-app-2' },
// 	{ destination: '/blog/سلة', source: '/سلة' },
// 	{ destination: '/blog/الاصول-والخصوم', source: '/الاصول-والخصوم' },
// 	{ destination: '/blog/التحليل-المالي', source: '/التحليل-المالي' },
// 	{
// 		destination: '/blog/مؤتمر-الحج-والعمرة',
// 		source: '/مؤتمر-الحج-والعمرة',
// 	},
// 	{
// 		destination: '/blog/قائمة-التدفقات-النقدية',
// 		source: '/قائمة-التدفقات-النقدية',
// 	},
// 	{ destination: '/blog/ضريبة-الاستقطاع', source: '/ضريبة-الاستقطاع' },
// 	{ destination: '/blog/يونيفونيك', source: '/يونيفونيك' },
// 	{
// 		destination: '/blog/نهاية-السنة-المالية',
// 		source: '/نهاية-السنة-المالية',
// 	},
// 	{ destination: '/blog/سند-صرف', source: '/سند-صرف' },
// 	{ destination: '/blog/تطوير-مشروع', source: '/تطوير-مشروع' },
// 	{
// 		destination: '/blog/المتاجر-الالكترونية',
// 		source: '/المتاجر-الالكترونية',
// 	},
// 	{
// 		destination: '/blog/جرد-المخزون-في-الشركات',
// 		source: '/جرد-المخزون-في-الشركات',
// 	},
// 	{
// 		destination: '/blog/العنوان-الوطني-السعودي',
// 		source: '/العنوان-الوطني-السعودي',
// 	},
// 	{ destination: '/blog/اتمته-المصانع', source: '/اتمته-المصانع' },
// 	{ destination: '/blog/nearpay', source: '/nearpay' },
// 	{ destination: '/blog/ووكومرس', source: '/ووكومرس' },
// 	{ destination: '/blog/صافي-الربح', source: '/صافي-الربح' },
// 	{
// 		destination: '/blog/ادارة-المخاطر-في-المشاريع',
// 		source: '/ادارة-المخاطر-في-المشاريع',
// 	},
// 	{
// 		destination: '/blog/القوائم-المالية-للشركات',
// 		source: '/القوائم-المالية-للشركات',
// 	},
// 	{ destination: '/blog/شركات-الحج', source: '/شركات-الحج' },
// ]

// function handleRedirects(request: NextRequest) {
// 	const url = request.nextUrl.clone()
// 	const { pathname } = url
// 	for (const redirect of redirects) {
// 		if (decodeURIComponent(pathname) === redirect.source) {
// 			url.pathname = redirect.destination
// 			return NextResponse.redirect(url)
// 		}
// 	}

// 	return null
// }

// const intlMiddleware = createMiddleware({
// 	defaultLocale,
// 	locales,
// 	localePrefix,
// 	pathnames,
// })

// export default function middleware(request: NextRequest) {
// 	const { pathname } = request.nextUrl

// 	// First, check for redirects
// 	const redirectResult = handleRedirects(request)
// 	if (redirectResult) return redirectResult

// 	// Skip locale negotiation for the /admin path and its static assets
// 	if (pathname.startsWith('/admin') || pathname.startsWith('/_next')) {
// 		return NextResponse.next()
// 	}

// 	// Apply locale middleware for other paths
// 	return intlMiddleware(request)
// }

// export const config = {
// 	matcher: [
// 		// Include all paths
// 		'/((?!api|_next/static|_next/image|favicon.ico).*)',
// 	],
// }
