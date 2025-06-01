import { useClient } from 'sanity'
import imageUrlBuilder from '@sanity/image-url'
/* eslint-disable */
const imageBuilder = imageUrlBuilder(useClient({ apiVersion: '2021-06-07' }))

export default imageBuilder
