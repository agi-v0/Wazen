'use client'

import React, { useState } from 'react'

const PlansComparison = () => {
	const [isMonthly, setIsMonthly] = useState(true)

	return (
		<div className="section py-24">
			<div className="grid max-w-sm text-sm md:mx-6 md:max-w-none md:grid-cols-4">
				{/* <!-- Column with labels --> */}
				<section className="md:contents">
					<div className="container w-full">
						<div className="flex h-full items-end justify-center py-6">
							<div className="flex justify-between rounded-md bg-gray-50">
								<span
									onClick={() => setIsMonthly(true)}
									className={`${
										isMonthly
											? 'pointer-events-none border-2 border-teal-500/20 bg-teal-50 text-teal-600'
											: 'text-gray-600'
									} cursor-pointer rounded-md px-8 py-3 text-base font-semibold`}
								>
									شهري
								</span>
								<span
									onClick={() => setIsMonthly(false)}
									className={`${
										isMonthly
											? 'text-gray-600'
											: 'pointer-events-none border-2 border-teal-500/20 bg-teal-50 text-teal-600'
									} cursor-pointer rounded-md px-8 py-3 text-base font-semibold`}
								>
									سنوي
								</span>
							</div>
						</div>
					</div>
					{/* <!-- # النظام المحاسبي --> */}
					<div
						className="flex flex-col justify-end bg-teal-100 px-6 py-2 max-md:hidden md:order-1"
						aria-hidden="true"
					>
						النظام المحاسبي
					</div>
					{/* <!-- Account Access --> */}
					<div
						className="flex flex-col justify-end bg-white px-6 max-md:hidden md:order-2"
						aria-hidden="true"
					>
						<div className="py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							Account Access
						</div>
					</div>
					{/* <!-- Custom Domains --> */}
					<div
						className="flex flex-col justify-end bg-white px-6 max-md:hidden md:order-3"
						aria-hidden="true"
					>
						<div className="py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							Custom Domains
						</div>
					</div>
					{/* <!-- Receipts Forward --> */}
					<div
						className="flex flex-col justify-end bg-white px-6 max-md:hidden md:order-4"
						aria-hidden="true"
					>
						<div className="py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							Receipts Forward
						</div>
					</div>
					{/* <!-- Supplier Management --> */}
					<div
						className="flex flex-col justify-end bg-white px-6 max-md:hidden md:order-5"
						aria-hidden="true"
					>
						<div className="py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							Supplier Management
						</div>
					</div>

					{/* <!-- Generate Public URLs --> */}
					<div
						className="flex flex-col justify-end bg-white px-6 max-md:hidden md:order-7"
						aria-hidden="true"
					>
						<div className="py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							Generate Public URLs
						</div>
					</div>
					{/* <!-- API Integrations --> */}
					<div
						className="flex flex-col justify-end bg-white px-6 max-md:hidden md:order-8"
						aria-hidden="true"
					>
						<div className="py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							API Integrations
						</div>
					</div>
					{/* <!-- Extra Add-ons --> */}
					<div
						className="flex flex-col justify-end bg-white px-6 max-md:hidden md:order-9"
						aria-hidden="true"
					>
						<div className="py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							Extra Add-ons
						</div>
					</div>
					{/* <!-- Admin Roles --> */}
					<div
						className="flex flex-col justify-end bg-white px-6 max-md:hidden md:order-10"
						aria-hidden="true"
					>
						<div className="py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							Admin Roles
						</div>
					</div>
					{/* <!-- Admin Roles --> */}
					<div
						className="flex flex-col justify-end bg-white px-6 max-md:hidden md:order-11"
						aria-hidden="true"
					>
						<div className="py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							Admin Roles
						</div>
					</div>
					{/* <!-- Enterprise Add-ons --> */}
					<div
						className="flex flex-col justify-end bg-white px-6 max-md:hidden md:order-12"
						aria-hidden="true"
					>
						<div className="py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							Enterprise Add-ons
						</div>
					</div>
					{/* <!-- # إدارة الموارد البشرية --> */}
					<div
						className="flex flex-col justify-end bg-teal-100 px-6 py-2 max-md:hidden md:order-[13]"
						aria-hidden="true"
					>
						إدارة الموارد البشرية
					</div>
					{/* <!-- Custom Connection --> */}
					<div
						className="flex flex-col justify-end bg-white px-6 max-md:hidden md:order-[14]"
						aria-hidden="true"
					>
						<div className="py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							Custom Connection
						</div>
					</div>
				</section>

				<section className="md:contents [&>div:first-child]:pt-10 [&>div:last-child]:pb-10">
					<div className="relative flex flex-col justify-end bg-white px-6">
						<div className="grow">
							<div className="pb-4 font-semibold">المجانية</div>
							<div className="mb-1">
								<h3 className="mb-2 text-[32px] font-bold text-black">
									<span className="amount">{0}</span>ريال
									<span className="text-lg font-light">
										/{isMonthly ? 'شهرياً' : 'سنوياً'}
									</span>
								</h3>
							</div>
						</div>
						<div className="my-6 rounded-md border-2 border-teal-500/20">
							<button className="bg-primary hover:shadow-signUp flex w-full items-center justify-center rounded-sm p-3 text-base font-semibold transition duration-300 ease-in-out hover:bg-opacity-80">
								إبدأ تجربتك المجانية
							</button>
						</div>
					</div>
					{/* <!-- # النظام المحاسبي --> */}
					<div className="flex flex-col justify-end bg-teal-100 px-6 md:order-1">
						<div className="mt-4 py-2 font-medium text-slate-900 md:sr-only dark:text-slate-200">
							النظام المحاسبي
						</div>
					</div>
					{/* <!-- Account Access --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-2">
						<div className="mr-3 flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<span>
								1 <span className="md:sr-only">Account Access</span>
							</span>
						</div>
					</div>
					{/* <!-- Custom Domains --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-3">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<svg
								className="mr-3 shrink-0 fill-emerald-500"
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="9"
							>
								<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
							</svg>
							<span>
								<span className="md:sr-only">Custom Domains</span>
							</span>
						</div>
					</div>
					{/* <!-- Receipts Forward --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-4">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<span>
								Unlimited <span className="md:sr-only">Receipts Forward</span>
							</span>
						</div>
					</div>
					{/* <!-- Supplier Management --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-5">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<svg
								className="mr-3 shrink-0 fill-emerald-500"
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="9"
							>
								<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
							</svg>
							<span>
								<span className="md:sr-only">Supplier Management</span>
							</span>
						</div>
					</div>
					{/* <!-- Generate Public URLs --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-7">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<svg
								className="mr-3 shrink-0 fill-emerald-500"
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="9"
							>
								<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
							</svg>
							<span>
								<span className="md:sr-only">Generate Public URLs</span>
							</span>
						</div>
					</div>
					{/* <!-- API Integrations --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-8">
						<div className="flex h-full items-center py-2 mr-3 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<span>
							-	<span className="md:sr-only">API Integrations</span>
							</span>
						</div>
					</div>
					{/* <!-- Extra Add-ons --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-9">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<svg
								className="mr-3 shrink-0 fill-emerald-500"
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="9"
							>
								<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
							</svg>
							<span>
								<span className="md:sr-only">Extra Add-ons</span>
							</span>
						</div>
					</div>
					{/* <!-- Admin Roles --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-10">
						<div className="flex items-center py-2 text-slate-600 max-md:sr-only dark:border-slate-700">
							<span>
								<span className="md:sr-only">Admin Roles</span>
							</span>
						</div>
					</div>
					{/* <!-- Admin Roles --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-11">
						<div className="flex items-center py-2 text-slate-600 max-md:sr-only dark:border-slate-700">
							<span>
								<span className="md:sr-only">Admin Roles</span>
							</span>
						</div>
					</div>
					{/* <!-- Enterprise Add-ons --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-12">
						<div className="flex items-center py-2 text-slate-600 max-md:sr-only dark:border-slate-700">
							<span>
								<span className="md:sr-only">Enterprise Add-ons</span>
							</span>
						</div>
					</div>
					{/* <!-- # إدارة الموارد البشرية --> */}
					<div className="justify-endbg-teal-100 flex flex-col bg-teal-100 px-6 md:order-[13]">
						<div className="sr-only mt-4 py-2 font-medium text-slate-900">
							إدارة الموارد البشرية
						</div>
					</div>
					{/* <!-- Custom Connection --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-[14]">
						<div className="flex items-center py-2 text-slate-600 max-md:sr-only dark:border-slate-700">
							<span>
								<span className="md:sr-only">Custom Connection</span>
							</span>
						</div>
					</div>
				</section>

				<section className="md:contents [&>div:first-child]:pt-10 [&>div:last-child]:pb-10">
					<div className="relative flex flex-col justify-end bg-white px-6">
						<div className="grow">
							<div className="pb-4 font-semibold">الأساسية</div>
							<div className="mb-1">
								<h3 className="mb-2 text-[32px] font-bold text-black">
									<span className="amount">{isMonthly ? 400 : 1000}</span>ريال
									<span className="text-lg font-light">
										/{isMonthly ? 'شهرياً' : 'سنوياً'}
									</span>
								</h3>
							</div>
						</div>
						<div className="my-6 rounded-md border-2 border-teal-500/20">
							<button className="bg-primary hover:shadow-signUp flex w-full items-center justify-center rounded-sm p-3 text-base font-semibold transition duration-300 ease-in-out hover:bg-opacity-80">
								إبدأ تجربتك المجانية
							</button>
						</div>
					</div>
					{/* <!-- # النظام المحاسبي --> */}
					<div className="flex flex-col justify-end bg-teal-100 px-6 md:order-1">
						<div className="mt-4 py-2 font-medium text-slate-900 md:sr-only dark:text-slate-200">
							النظام المحاسبي
						</div>
					</div>
					{/* <!-- Account Access --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-2">
						<div className="mr-3 flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<span>
								2 <span className="md:sr-only">Account Access</span>
							</span>
						</div>
					</div>
					{/* <!-- Custom Domains --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-3">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<svg
								className="mr-3 shrink-0 fill-emerald-500"
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="9"
							>
								<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
							</svg>
							<span>
								<span className="md:sr-only">Custom Domains</span>
							</span>
						</div>
					</div>
					{/* <!-- Receipts Forward --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-4">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<span>
								Unlimited <span className="md:sr-only">Receipts Forward</span>
							</span>
						</div>
					</div>
					{/* <!-- Supplier Management --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-5">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<svg
								className="mr-3 shrink-0 fill-emerald-500"
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="9"
							>
								<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
							</svg>
							<span>
								<span className="md:sr-only">Supplier Management</span>
							</span>
						</div>
					</div>
					{/* <!-- Generate Public URLs --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-7">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<svg
								className="mr-3 shrink-0 fill-emerald-500"
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="9"
							>
								<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
							</svg>
							<span>
								<span className="md:sr-only">Generate Public URLs</span>
							</span>
						</div>
					</div>
					{/* <!-- API Integrations --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-8">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<svg
								className="mr-3 shrink-0 fill-emerald-500"
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="9"
							>
								<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
							</svg>
							<span>
								<span className="md:sr-only">API Integrations</span>
							</span>
						</div>
					</div>
					{/* <!-- Extra Add-ons --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-9">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<svg
								className="mr-3 shrink-0 fill-emerald-500"
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="9"
							>
								<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
							</svg>
							<span>
								<span className="md:sr-only">Extra Add-ons</span>
							</span>
						</div>
					</div>
					{/* <!-- Admin Roles --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-10">
						<div className="flex items-center py-2 text-slate-600 max-md:sr-only dark:border-slate-700">
							<span>
								<span className="md:sr-only">Admin Roles</span>
							</span>
						</div>
					</div>
					{/* <!-- Admin Roles --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-11">
						<div className="flex items-center py-2 text-slate-600 max-md:sr-only dark:border-slate-700">
							<span>
								<span className="md:sr-only">Admin Roles</span>
							</span>
						</div>
					</div>
					{/* <!-- Enterprise Add-ons --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-12">
						<div className="flex items-center py-2 text-slate-600 max-md:sr-only dark:border-slate-700">
							<span>
								<span className="md:sr-only">Enterprise Add-ons</span>
							</span>
						</div>
					</div>
					{/* <!-- # إدارة الموارد البشرية --> */}
					<div className="flex flex-col justify-end bg-teal-100 px-6 md:order-[13]">
						<div className="sr-only mt-4 py-2 font-medium text-slate-900">
							إدارة الموارد البشرية
						</div>
					</div>
					{/* <!-- Custom Connection --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-[14]">
						<div className="flex items-center py-2 text-slate-600 max-md:sr-only dark:border-slate-700">
							<span>
								<span className="md:sr-only">Custom Connection</span>
							</span>
						</div>
					</div>
				</section>

				{/* <!-- Perform table --> */}
				<section className="dark md:contents [&>div:first-child]:pt-10 [&>div:last-child]:pb-10">
					<div className="relative flex flex-col justify-end bg-white px-6">
						<div className="absolute right-0 top-0 -mt-4 mr-6"></div>
						<div className="grow">
							<div className="pb-4 font-semibold">المتقدمة</div>
							<div className="mb-1">
								<h3 className="mb-2 text-[32px] font-bold text-black">
									<span className="amount">{isMonthly ? 600 : 2100}</span>ريال
									<span className="text-lg font-light">
										/{isMonthly ? 'شهرياً' : 'سنوياً'}
									</span>
								</h3>
							</div>
						</div>
						<div className="my-6 rounded-md border-2 border-teal-500/20">
							<button className="bg-primary hover:shadow-signUp flex w-full items-center justify-center rounded-sm p-3 text-base font-semibold transition duration-300 ease-in-out hover:bg-opacity-80">
								إبدأ تجربتك المجانية
							</button>
						</div>
					</div>
					{/* <!-- # النظام المحاسبي --> */}
					<div className="flex flex-col justify-end bg-teal-100 px-6 md:order-1">
						<div className="mt-4 py-2 font-medium text-slate-900 md:sr-only dark:text-slate-200">
							النظام المحاسبي
						</div>
					</div>
					{/* <!-- Account Access --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-2">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<span>
								Unlimited <span className="md:sr-only">Account Access</span>
							</span>
						</div>
					</div>
					{/* <!-- Custom Domains --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-3">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<svg
								className="mr-3 shrink-0 fill-emerald-500"
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="9"
							>
								<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
							</svg>
							<span>
								<span className="md:sr-only">Custom Domains</span>
							</span>
						</div>
					</div>
					{/* <!-- Receipts Forward --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-4">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<span>
								Unlimited <span className="md:sr-only">Receipts Forward</span>
							</span>
						</div>
					</div>
					{/* <!-- Supplier Management --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-5">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<svg
								className="mr-3 shrink-0 fill-emerald-500"
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="9"
							>
								<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
							</svg>
							<span>
								<span className="md:sr-only">Supplier Management</span>
							</span>
						</div>
					</div>
					{/* <!-- Generate Public URLs --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-7">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<svg
								className="mr-3 shrink-0 fill-emerald-500"
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="9"
							>
								<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
							</svg>
							<span>
								<span className="md:sr-only">Generate Public URLs</span>
							</span>
						</div>
					</div>
					{/* <!-- API Integrations --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-8">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<svg
								className="mr-3 shrink-0 fill-emerald-500"
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="9"
							>
								<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
							</svg>
							<span>
								<span className="md:sr-only">API Integrations</span>
							</span>
						</div>
					</div>
					{/* <!-- Extra Add-ons --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-9">
						<div className="flex h-full items-center py-2 text-slate-600 dark:border-slate-700 dark:text-slate-400">
							<svg
								className="mr-3 shrink-0 fill-emerald-500"
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="9"
							>
								<path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
							</svg>
							<span>
								<span className="md:sr-only">Extra Add-ons</span>
							</span>
						</div>
					</div>
					{/* <!-- Admin Roles --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-10">
						<div className="flex items-center py-2 text-slate-600 max-md:sr-only dark:border-slate-700">
							<span>
								<span className="md:sr-only">Admin Roles</span>
							</span>
						</div>
					</div>
					{/* <!-- Admin Roles --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-11">
						<div className="flex items-center py-2 text-slate-600 max-md:sr-only dark:border-slate-700">
							<span>
								<span className="md:sr-only">Admin Roles</span>
							</span>
						</div>
					</div>
					{/* <!-- Enterprise Add-ons --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-12">
						<div className="flex items-center py-2 text-slate-600 max-md:sr-only dark:border-slate-700">
							<span>
								<span className="md:sr-only">Enterprise Add-ons</span>
							</span>
						</div>
					</div>
					{/* <!-- # إدارة الموارد البشرية --> */}
					<div className="flex flex-col justify-end bg-teal-100 px-6 md:order-[13]">
						<div className="sr-only mt-4 py-2 font-medium">
							إدارة الموارد البشرية
						</div>
					</div>
					{/* <!-- Custom Connection --> */}
					<div className="flex flex-col justify-end bg-white px-6 md:order-[14]">
						<div className="flex items-center py-2 text-slate-600 max-md:sr-only dark:border-slate-700">
							<span>
								<span className="md:sr-only">Custom Connection</span>
							</span>
						</div>
					</div>
				</section>
				{/* <!-- End: Perform table --> */}
			</div>
		</div>
	)
}

export default PlansComparison
