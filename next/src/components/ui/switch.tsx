'use client'

import * as React from 'react'
import { Switch as SwitchPrimitives } from 'radix-ui'

import { cn } from '@/lib/utils'
import { useParams } from 'next/navigation'

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
	const { locale } = useParams()

	return (
		<SwitchPrimitives.Root
			className={cn(
				'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-teal-500 data-[state=unchecked]:bg-gray-400 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950',
				className,
			)}
			{...props}
			ref={ref}
		>
			<SwitchPrimitives.Thumb
				className={cn(
					'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform',
					locale == 'en'
						? 'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
						: 'data-[state=checked]:-translate-x-4 data-[state=unchecked]:translate-x-0',
				)}
			/>
		</SwitchPrimitives.Root>
	)
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
