export default {
	name: 'jobApplicationTabs',
	title: 'تابات نموذج التوظيف',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'عنوان الصفحة الرئيسي',
			type: 'string',
			description: 'يظهر كالعنوان الكبير أعلى الصفحة (مثل "انضم إلى فريقنا")',
		},
		{
			name: 'subtitle',
			title: 'العنوان الفرعي للصفحة',
			type: 'string',
			description: 'يظهر تحت العنوان الرئيسي لشرح أو توضيح إضافي.',
		},
		{
			name: 'tabs',
			title: 'التابات',
			type: 'array',
			of: [
				{
					type: 'object',
					title: 'تاب',
					fields: [
						{
							name: 'label',
							title: 'اسم التاب (العنوان الرئيسي على الزر)',
							type: 'string',
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'sublabel',
							title: 'اسم فرعي للتاب (اختياري)',
							type: 'string',
							description: 'يظهر أسفل أو بجانب اسم التاب الرئيسي.',
						},
						{
							name: 'type',
							title: 'نوع التاب',
							type: 'string',
							options: {
								list: [
									{ title: 'فورم التقديم', value: 'form' },
									{ title: 'محتوى نصي', value: 'text' },
								],
								layout: 'radio',
							},
							validation: (Rule) => Rule.required(),
						},
						{
							name: 'mainTitle',
							title: 'العنوان الرئيسي داخل التاب',
							type: 'string',
							hidden: ({ parent }) => parent?.type !== 'text',
						},
						{
							name: 'subtitle',
							title: 'العنوان الفرعي داخل التاب',
							type: 'string',
							hidden: ({ parent }) => parent?.type !== 'text',
						},
						{
							name: 'introText',
							title: 'النص التعريفي',
							type: 'array',
							of: [{ type: 'block' }],
							hidden: ({ parent }) => parent?.type !== 'text',
						},
						{
							name: 'description',
							title: 'الوصف',
							type: 'array',
							of: [{ type: 'block' }],
							hidden: ({ parent }) => parent?.type !== 'text',
						},
						{
							name: 'requirements',
							title: 'المتطلبات',
							type: 'array',
							of: [{ type: 'block' }],
							hidden: ({ parent }) => parent?.type !== 'text',
						},
						{
							name: 'benefits',
							title: 'المميزات',
							type: 'array',
							of: [{ type: 'block' }],
							hidden: ({ parent }) => parent?.type !== 'text',
						},

						// ✅ الزر الجديد داخل التاب
						{
							name: 'button',
							title: 'زر داخل التاب',
							type: 'object',

							fields: [
								{
									name: 'text',
									title: 'نص الزر',
									type: 'string',
								},
								{
									name: 'link',
									title: 'رابط الزر',
									type: 'url',
								},
							],
						},
					],
				},
			],
		},
		{
			name: 'headerImages',
			title: 'الصور التوضيحية أسفل العنوان',
			type: 'array',
			description: 'يمكنك رفع حتى 4 صور تظهر أسفل العنوان الرئيسي في الصفحة.',
			of: [
				{
					type: 'image',
					title: 'صورة',
					options: { hotspot: true },
					fields: [
						{
							name: 'alt',
							title: 'النص البديل للصورة',
							type: 'string',
						},
					],
				},
			],
			validation: (Rule) => Rule.max(5).error('يمكن رفع 5 صور كحد أقصى فقط'),
		},
	],
}
