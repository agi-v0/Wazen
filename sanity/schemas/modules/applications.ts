import { defineField, defineType, defineArrayMember } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default defineType({
  name: 'applications',
  title: 'Applications',
  icon: TfiLayoutCtaCenter,
  type: 'object',

  fields: [
    defineField({
      name: 'pretitle',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'ctas',
      title: 'Call-to-actions',
      type: 'array',
      of: [{ type: 'cta' }],
    }),
    defineField({
      name: 'chips',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (Phosphor icons)',
              description: `Go to https://phosphoricons.com/ and find the icon of your choice. Copy it's name and paste it here to look it up.`,
              type: 'icon',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
            }),
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              type: 'text',
            }),
            defineField({
              name: 'link',
              type: 'link',
            }),
          ],
          preview: {
            select: {
              card: 'title',
              description: 'description',
              image: 'image',
            },
            prepare: ({ card, description, image }) => ({
              title: card,
              subtitle: description,
              media: image,
            }),
          },
        }),
      ],
      options: {
        advanced: {
          select: true,
        },
      },
    }),
    defineField({
      name: 'altApps',
      title: 'Competitor comparison',
      type: 'object',
      fields: [
        defineField({
          name: 'altAppsLogos',
          title: 'Competitor logos',
          type: 'array',
          of: [
            {
              type: 'image',
            },
          ],
        }),
        defineField({
          name: 'comparisonTable',
          type: 'table',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      pretitle: 'pretitle',
      content: 'content',
      media: 'image',
    },
    prepare: ({ pretitle, content, media }) => ({
      title: getBlockText(content),
      subtitle: 'Applications',
      media,
    }),
  },
})