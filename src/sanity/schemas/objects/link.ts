import { VscLink } from 'react-icons/vsc'

export default {
	name: 'link',
	title: 'Link',
	icon: VscLink,
	type: 'object',
	fields: [
		{
			name: 'label',
			type: 'string',
		},
		{
			name: 'description',
			type: 'text',
		},
		{
			name: 'iconify',
			title: 'Icon (Phosphor icons)',
			description: `Go to https://phosphoricons.com/ and find the icon of your choice. Copy it's name and paste it here to look it up.`,
			type: 'icon',
		},
		{
			name: 'type',
			type: 'string',
			options: {
				layout: 'radio',
				list: [
					{ title: 'internal', value: 'internal' },
					{ title: 'external', value: 'external' },
				],
			},
			initialValue: 'internal',
		},
		{
			name: 'internal',
			type: 'reference',
			to: [{ type: 'page' }, { type: 'blog.post' }],
			hidden: ({ parent }: any) => parent?.type !== 'internal',
		},
		{
			name: 'external',
			type: 'url',
			validation: (Rule: any) =>
				Rule.uri({
					scheme: ['http', 'https', 'mailto', 'tel'],
					allowRelative: true,
				}),
			hidden: ({ parent }: any) => parent?.type !== 'external',
		},
		{
			name: 'params',
			title: 'URL params',
			type: 'string',
			hidden: ({ parent }: any) => parent?.type !== 'internal',
		},
	],
	preview: {
		select: {
			label: 'label',
			_type: 'internal._type',
			title: 'internal.title',
			slug: 'internal.metadata.slug.current',
			external: 'external',
			params: 'params',
		},
		prepare: ({ label, _type, title, slug, external, params }: any) => ({
			title: label || title,
			subtitle: [
				_type === 'blog.post' ? '/blog' : null,
				external || (slug && (slug === 'index' ? '/' : `/${slug}`)),
				params,
			]
				.filter(Boolean)
				.join(''),
		}),
	},
}
