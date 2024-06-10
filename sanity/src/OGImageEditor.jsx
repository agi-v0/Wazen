import React from 'react'
import css from './OGImageLayout.module.css'

const Component = ({ title }) => {
	return (
		<div dir="rtl" className={css.root}>
			<div>
				<h1>{title}</h1>
			</div>
			<img src="/static/OGImageBg.png" className={css.bg} alt="" />
		</div>
	)
}

export const OGImageEditor = {
	name: 'OGImage',
	title: 'testLayout',
	component: Component,
	prepare: (document) => ({
		title: document.title,
	}),
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
	],
}
