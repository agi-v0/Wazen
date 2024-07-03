import Img from '@/ui/Img'
import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import Pretitle from '@/ui/Pretitle'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import Image from 'next/image'
import dropdown from '../../../public/accounting-full-option.svg'
import Brief from './Brief'

export default function BriefGroup({
	briefs,
}: Partial<{
	briefs: Sanity.Module[]
}>) {
	return (
		<div className="bg-gradient-to-b from-teal-50 from-90% to-white">
			{briefs?.map((brief) => <Brief {...brief} key={brief._key} />)}
		</div>
	)
}
