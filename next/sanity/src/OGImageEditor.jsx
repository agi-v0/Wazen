import React from 'react'
import css from './OGImageLayout.module.css'
import logoAr from '../static/wazen-logo-ar.svg'
import logoEn from '../static/wazen-logo-en.svg'
import { useFormValue } from 'sanity'

let language = 'ar'
const Component = ({ title }) => {
	return (
		<div dir={language == 'ar' ? 'rtl' : 'ltr'} className={css.root}>
			<img src={language == 'ar' ? logoAr : logoEn} className={css.logo} />
			<div className={css.card}>
				<h1>{title}</h1>
			</div>
		</div>
	)
}

export const OGImageEditor = {
	name: 'OGImage',
	title: 'testLayout',
	prepare: () => {
		const title = useFormValue(['metadata.title'])
		language = useFormValue(['language'])
		return {
			title,
			language,
		}
	},
	component: Component,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
	],
}
