'use client'

import { cn } from '@/lib/utils'
import { Icon } from '@iconify-icon/react'
import { InfiniteSlider } from '../ui/infinite-slider'

type CardItem = {
	title: string
	icon: string
}

type InfiniteMovingCardsProps = {
	reverse?: boolean
	items: CardItem[]
}

const SPEED_MAP = {
	fast: '10s',
	normal: '40s',
	slow: '100s',
}

export default function InfiniteMovingCards({
	reverse,
	items,
}: InfiniteMovingCardsProps) {
	const renderItems = (itemsToRender: CardItem[]) => {
		return itemsToRender.map(({ title, icon }, index) => (
			<li
				key={`${title}-${index}`}
				className="flex h-full flex-row items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3"
			>
				<p className="text-start text-base font-medium text-gray-600">
					{title}
				</p>
				<Icon
					icon={icon || 'ph:cube-duotone'}
					className="text-xl text-gray-600"
				/>
			</li>
		))
	}

	return (
		<div className="flex w-full flex-col items-center justify-center overflow-x-hidden">
			{/*<ul
				className={cn(
					'mx-auto flex w-max min-w-full shrink-0 flex-nowrap gap-2',
				)}
			>
			</ul>*/}
			<InfiniteSlider gap={8} reverse={reverse} speed={48} speedOnHover={20}>
				{renderItems(items)}
			</InfiniteSlider>
		</div>
	)
}
