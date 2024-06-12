import React from 'react'
import css from './OGImageLayout.module.css'

const Component = ({ title }) => {
	return (
		<div dir="rtl" className={css.root}>
			<div className={css.card}>
				<h1>{title}</h1>
			</div>
		</div>
	)
}
console.log(document)
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
