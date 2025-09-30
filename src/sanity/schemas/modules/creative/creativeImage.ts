import { IoIosImage } from 'react-icons/io'

export default {
	name: 'image',
	icon: IoIosImage,
	type: 'image',
	options: {
		hotspot: true,
	},
	fields: [
		{
			name: 'alt',
			type: 'string',
		},
		{
			name: 'aspectRatio',
			type: 'string',
		},
	],
	preview: {
		select: {
			media: 'image',
		},
	},
}
